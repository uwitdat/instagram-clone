import React from 'react'
import Menu from '@mui/material/Menu';
import { useMutation } from '@apollo/client';
import { DELETE_POST_MUTATION } from '../utils/mutations';
import { useAppContext } from '../context';

const PostOptionsMenu = ({ anchorEl, open, handleClose, postId, handleClosePosts }) => {

  const [deletePost] = useMutation(DELETE_POST_MUTATION)
  const [state, setState] = useAppContext()

  const removePostFromUser = async () => {
    try {
      const { data } = await deletePost({
        variables: { postId }
      })
      if (data.deletePost) {
        handleClose()
        setTimeout(() => { handleClosePosts(), removePostFromState(postId) }, 1000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const removePostFromState = (id) => {
    setState({
      ...state,
      currentUser: {
        ...state.currentUser,
        posts: state.currentUser.posts.filter((post) => post.id !== id)
      }
    })
  }

  return (
    <Menu
      id="post-options-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{ style: menuStyles }}
    >
      <p onClick={removePostFromUser} style={textStyles}>Remove</p>
    </Menu>
  )
}

const menuStyles = {
  color: 'white',
  backgroundColor: 'black',
  border: '1px solid rgba(128, 128, 128, 0.479)',
  fontSize: '.5rem',
  padding: '0',
  height: '2rem',
  width: 'auto',
  display: 'grid',
  placeItems: 'center'
}

const textStyles = {
  cursor: 'pointer',
  fontFamily: 'Arimo, sans-serif',
  fontSize: '.75rem',
  padding: '0 1rem',
  fontWeight: '600'
}

export default PostOptionsMenu