import React, { useState, useEffect, useRef } from 'react';
import Overlay from './Overlay';
import editProfileStyles from '../styles/edit-profile.module.scss';
import { defaultDataIdFromObject, useMutation } from '@apollo/client';
import { EDIT_USER_MUTATION, UPLOAD_FILE } from '../utils/mutations';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';


const EditProfile = ({ showEditProfile, setShowEditProfile, currentUser, setCurrentUser }) => {
  const [newUserAvatar, setNewUserAvatar] = useState(null);
  const [preview, setPreview] = useState();
  const inputRef = useRef(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const handleCloseEditProfile = () => {
    setShowEditProfile(false)
    setNewUserAvatar(null)
    setPreview(null)
  }

  const validateFields = Yup.object({
    userName: Yup.string()
      .min(4, 'Username must be a minimum of 4 chatacters')
      .required('Username is a required field')
      .matches(/^[aA-zZ\s]+$/, 'Username may not contain special characters'),
    name: Yup.string().max(15, 'Name can not exceed 15 characters'),
    bio: Yup.string().max(50, 'Bio can not exceed 50 characters'),
  })


  const handleOpenFileInput = () => {
    inputRef.current.click()
  }

  const handleSetNewUserAvatar = (e) => {
    if (e.target.files[0]) {
      setNewUserAvatar(e.target.files[0])
    }
  }

  const handleSubmitChanges = (values) => {
    if (newUserAvatar) {
      handleUpload(values)
    } else {
      handleSubmitEditUserInfo(values, null)
    }
  }

  const handleUpload = async (values) => {
    if (!newUserAvatar) return;

    try {
      const { data } = await uploadFile({
        variables: { file: newUserAvatar }
      })
      if (data) {
        handleSubmitEditUserInfo(values, data.uploadFile.url)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const [updateUser] = useMutation(EDIT_USER_MUTATION);

  const handleSubmitEditUserInfo = async (values, downloadURL) => {
    const { name, userName, avatar, bio } = values;

    try {
      const { data } = await updateUser({
        variables: { updateUserInput: { id: Number(currentUser.id), name, userName, avatar: downloadURL ? downloadURL : avatar, bio } }
      })
      if (data.updateUser) {

        setCurrentUser({
          ...currentUser,
          name: data.updateUser.name,
          userName: data.updateUser.userName,
          bio: data.updateUser.bio,
          avatar: data.updateUser.avatar
        })
        setNewUserAvatar(null);
        setPreview(null);
        handleCloseEditProfile();
      }
    } catch (err) {
      console.log(err.message);
    }
  }


  useEffect(() => {
    if (!newUserAvatar) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(newUserAvatar)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [newUserAvatar])


  return (
    <Formik
      initialValues={{
        name: currentUser ? currentUser.name : '',
        userName: currentUser ? currentUser.userName : '',
        bio: currentUser ? currentUser.bio : '',
        avatar: currentUser ? currentUser.avatar : ''
      }}
      validationSchema={validateFields}
      onSubmit={handleSubmitChanges}
    >
      {({ values, isValid, errors, touched }) => (
        <Form>
          <Overlay height='100vh' top={0} isShowing={showEditProfile}>

            <nav className={editProfileStyles.nav}>
              <button type='button' onClick={handleCloseEditProfile}>Cancel</button>
              <h3>Edit profile</h3>
              <button disabled={isValid ? false : true} type='submit' onClick={() => handleSubmitChanges(values)}>Done</button>
            </nav>

            <div className={editProfileStyles.profilePicture}>
              {!preview ? (
                <img
                  src={currentUser && currentUser.avatar ? currentUser.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'}
                  alt='user profile img' />
              ) : (
                <img
                  src={preview}
                  alt='user profile img' />
              )}
              <p onClick={handleOpenFileInput}>Change profile picture</p>
            </div>

            <section className={editProfileStyles.content}>
              <div>
                <p>Name</p>
                <Field id={errors.name && touched.name ? editProfileStyles.errorInput : ''} placeholder='Name' name='name' />
              </div>
              <div>
                <p>Username</p>
                <Field id={errors.userName && touched.userName ? editProfileStyles.errorInput : ''} placeholder='Username' name='userName' />
              </div>
              <div>
                <p>Bio</p>
                <Field id={errors.bio && touched.bio ? editProfileStyles.errorInput : ''} placeholder='Bio' name='bio' />
              </div>

              <div className={editProfileStyles.errorContainer}>
                <ErrorMessage name='userName' component='p' />
                <ErrorMessage name='name' component='p' />
                <ErrorMessage name='bio' component='p' />
              </div>
            </section>
            <input type='file' ref={inputRef} multiple={false} style={{ display: 'none' }} onChange={handleSetNewUserAvatar} />
          </Overlay>
        </Form>
      )}

    </Formik>
  )
}

export default EditProfile