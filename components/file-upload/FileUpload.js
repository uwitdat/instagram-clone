import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import fileUploadStyles from '../../styles/file-upload.module.scss';
import { useDropzone } from 'react-dropzone';
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { getCurrentUser } from '../../hooks';
import { useMutation } from '@apollo/client';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { CREATE_POST_MUTATION } from '../../utils/mutations';
import Router from 'next/router';
import { LinearProgress } from '@mui/material';

const FileUpload = ({ open, handleClose }) => {
  const [currentUser] = getCurrentUser();


  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [postDescription, setPostDesctiption] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSetFile = (file) => setImage(file);
  const [createPost] = useMutation(CREATE_POST_MUTATION);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, open: openFileUpload } = useDropzone({ accept: 'image/*', noClick: true })

  const fileToUpload = acceptedFiles[0]

  const handleCreateNewPost = async (url) => {
    try {
      const { data } = await createPost({
        variables: { createPostInput: { postContent: url, userId: Number(currentUser.currentUser.id), postDescription } }
      })
      if (data.createPost) {
        handleClose()
        router.push({
          pathname: '/profile',
          query: { user: currentUser?.currentUser?.id }
        })

      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const router = Router;

  const handleUpload = () => {
    if (!image) return;
    const imageRef = ref(storage, `posts/${image.name + v4()}`)
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on('state_changed',
      (snapshot) => {

        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);

      },
      (error) => {
        console.log(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleCreateNewPost(downloadURL)
        });
      }
    );
  }

  useEffect(() => {
    if (!image && !fileToUpload) {
      setPreview(undefined)
      return
    }

    handleSetFile(fileToUpload)
    const objectUrl = URL.createObjectURL(fileToUpload)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [fileToUpload])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0, .75)" } }}
    >
      <Box sx={modalStyle}>
        <div className={fileUploadStyles.container}>
          <div className={fileUploadStyles.border}>

            {image ? (
              <div className={fileUploadStyles.nav}>
                <MdOutlineArrowBackIosNew onClick={() => setImage(null)} />
                <h2>Create New Post</h2>
                <button onClick={handleUpload}>Share</button>
              </div>

            ) : (
              <div className={fileUploadStyles.navOneItem}>
                <h2>Create New Post</h2>
              </div>
            )}


            {image ? (
              <div className={fileUploadStyles.confirmationContainer}>
                <div className={fileUploadStyles.imagePreview}>
                  {image && <img src={preview} />}
                </div>
                <div className={fileUploadStyles.postDescription}>
                  <div>
                    <img src='https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg' alt='profile' />
                    <h2>{currentUser.currentUser.userName}</h2>
                  </div>
                  <textarea value={postDescription} onChange={(e) => setPostDesctiption(e.target.value)} placeholder={'Write a caption...'} />
                </div>
              </div>
            ) : (
              <div {...getRootProps({ className: 'dropzone' })} className={isDragActive ? `${fileUploadStyles.content} ${fileUploadStyles.isDragging}` : `${fileUploadStyles.content}`}>
                <svg aria-label="Icon to represent media such as images or videos" className="_8-yf5 " color="white" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                <p>Drop photos here</p>
                <button onClick={openFileUpload}>Select from computer</button>
                <input {...getInputProps()} multiple={false} />
              </div>
            )}

          </div>
        </div>

        <span onClick={handleClose} className={fileUploadStyles.exitButton}>X</span>
      </Box>
    </Modal>
  )
}

export default FileUpload;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'transparent',
  borderColor: 'none',
  p: 4,
  outline: 'none'
};