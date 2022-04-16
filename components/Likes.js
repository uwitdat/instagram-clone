import React from 'react';
import likeStyles from '../styles/likes.module.scss';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import Overlay from './Overlay';

const Likes = ({ showLikes, setShowLikes, currentTopPosition, likes }) => {
  const handleCloseLikes = () => setShowLikes(false)

  return (
    <Overlay isShowing={showLikes} currentTopPosition={currentTopPosition} height={'93.5vh'}> {/*TODO: change height value to something more dynamic */}
      <nav className={likeStyles.nav}>
        <MdOutlineArrowBackIosNew onClick={handleCloseLikes} />
        <h3>Likes</h3>
      </nav>

      <div className={likeStyles.likeContent}>
        {likes.map((likedBy, idx) => (
          <div className={likeStyles.like} key={idx}>
            <div>
              <img src={likedBy.userAvatar} alt={likedBy.userAvatar} />
              <div>
                <h3>{likedBy.userName}</h3>
                <p>{likedBy.name}</p>
              </div>
            </div>
            <div>
              <button>Follow</button>
            </div>
          </div>
        ))}
      </div>
    </Overlay>
  )
}

export default Likes