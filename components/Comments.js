import React from 'react'
import commentStyles from '../styles/comments.module.scss';

const Comments = ({ showComments, setShowComments, currentTopPosition }) => {

  const handleCloseComments = () => setShowComments(false)

  return (
    <div
      className={showComments ? commentStyles.showComments : ''}
      style={{ height: '100vh', width: '100vw', backgroundColor: 'black', position: 'absolute', zIndex: '1', transform: 'translateX(100vw)', top: `${currentTopPosition}px` }}>
      <button onClick={handleCloseComments} style={{ color: 'white' }}>back</button>
      <div style={{ color: 'white' }}>
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