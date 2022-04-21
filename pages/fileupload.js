import React, { useState } from 'react'
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { CREATE_POST_MUTATION } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import postUploadStyles from '../styles/post-upload.module.scss';
import { requireAuthentication } from '../auth';
import { getCurrentUser } from '../hooks';


const Fileupload = () => {
  const [currentUser] = getCurrentUser()
  const [image, setImage] = useState(null)
  const [createPost] = useMutation(CREATE_POST_MUTATION)
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSetFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleCreateNewPost = async (url) => {
    try {
      const { data } = await createPost({
        variables: { createPostInput: { postContent: url, userId: Number(currentUser.currentUser.id) } }
      })
      if (data.createPost) {
        console.log('RES =>>>', data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

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

  return (
    <div>
      <h2>UPLOAD A FILE</h2>
      <input type='file' multiple={false} onChange={handleSetFile} /><br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export const getServerSideProps = requireAuthentication(context => {
  return {
    props: {}
  }
})



export default Fileupload;