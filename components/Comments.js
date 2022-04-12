import React from 'react'
import commentStyles from '../styles/comments.module.scss';

const Comments = ({ showComments, setShowComments, currentTopPosition, comments }) => {

  const handleCloseComments = () => setShowComments(false)

  console.log('comments', comments)

  return (
    <div className={showComments ? commentStyles.showComments : commentStyles.comments} style={{ top: `${currentTopPosition}px` }}>
      <button onClick={handleCloseComments} style={{ color: 'white' }}>back</button>
      <div className={commentStyles.commentContent}>
        <p>some CoMEnT</p>
        <p>some CoMEnT</p>
        <p>some CoMEnT</p>
        <p>some CoMEnT</p>
        <p>some CoMEnT</p>
        <p>some CoMEnT</p>
        <p>some CoMEnT</p>
      </div>
    </div>
  )
}

export default Comments