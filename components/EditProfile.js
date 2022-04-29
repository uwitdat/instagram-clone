import React, { useState, useEffect, useRef } from 'react';
import Overlay from './Overlay';
import editProfileStyles from '../styles/edit-profile.module.scss';
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { EDIT_USER_MUTATION, UPLOAD_FILE } from '../utils/mutations';


const EditProfile = ({ showEditProfile, handleCloseEditProfile, currentUser, setCurrentUser }) => {
  const [newUserAvatar, setNewUserAvatar] = useState(null);
  const [preview, setPreview] = useState();
  const inputRef = useRef(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const [editValues, setEditValues] = useState({
    name: '',
    userName: '',
    bio: '',
    avatar: ''
  })

  const handleEditValues = (e) => {
    const { name, value } = e.target;

    setEditValues({
      ...editValues,
      [name]: value
    })
  }

  const handleOpenFileInput = () => {
    inputRef.current.click()
  }

  const handleSetNewUserAvatar = (e) => {
    if (e.target.files[0]) {
      setNewUserAvatar(e.target.files[0])
    }
  }

  const handleSubmitChanges = () => {
    if (newUserAvatar) {
      handleUpload()
    } else {
      handleSubmitEditUserInfo()
    }

  }

  const handleUpload = async () => {
    if (!newUserAvatar) return;

    try {
      const { data } = await uploadFile({
        variables: { file: newUserAvatar }
      })
      if (data) {
        handleSubmitEditUserInfo(data.uploadFile.url)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const [updateUser] = useMutation(EDIT_USER_MUTATION);

  const handleSubmitEditUserInfo = async (downloadURL) => {
    const { name, userName, avatar, bio } = editValues;

    try {
      const { data } = await updateUser({
        variables: { updateUserInput: { id: Number(currentUser.id), name, userName, avatar: downloadURL ? downloadURL : avatar, bio } }
      })
      if (data.updateUser) {
        setCurrentUser({
          ...currentUser,
          currentUser: data.updateUser
        })
        setNewUserAvatar(null)
        setPreview(null)
        handleCloseEditProfile()
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    if (currentUser) {
      setEditValues({
        name: currentUser.name,
        userName: currentUser.userName,
        bio: currentUser.bio,
        avatar: currentUser.avatar
      })
    }
  }, [currentUser])

  useEffect(() => {
    if (!newUserAvatar) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(newUserAvatar)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [newUserAvatar])

  useEffect(() => {
    if (handleCloseEditProfile) {
      setNewUserAvatar(null)
      setPreview(null)
    }
  }, [handleCloseEditProfile])


  return (
    <Overlay height='100vh' top={0} isShowing={showEditProfile}>

      <nav className={editProfileStyles.nav}>
        <button onClick={handleCloseEditProfile}>Cancel</button>
        <h3>Edit profile</h3>
        <button onClick={handleSubmitChanges}>Done</button>
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
          <input placeholder='Name' name='name' value={editValues.name} onChange={handleEditValues} />
        </div>
        <div>
          <p>Username</p>
          <input placeholder='Username' name='userName' value={editValues.userName} onChange={handleEditValues} />
        </div>
        <div>
          <p>Bio</p>
          <input placeholder='Bio' name='bio' value={editValues.bio} onChange={handleEditValues} />
        </div>
      </section>

      <input type='file' ref={inputRef} multiple={false} style={{ display: 'none' }} onChange={handleSetNewUserAvatar} />

    </Overlay>
  )
}

export default EditProfile