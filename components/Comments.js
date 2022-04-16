import React, { useState, useRef } from 'react';
import commentStyles from '../styles/comments.module.scss';
import { FiSend } from 'react-icons/fi';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { RiHeartLine } from 'react-icons/ri';
import moment from 'moment';
import Overlay from './Overlay';

const Comments = ({ showComments, setShowComments, currentTopPosition, post }) => {

  const handleCloseComments = () => setShowComments(false);
  const [newComment, setNewComment] = useState('');

  const [inputFocused, setInputFocused] = useState(null);
  const focusInput = () => setInputFocused(true); // TODO: create focus/ blur on input
  const blurInput = () => setInputFocused(false);


  const handleSubmitComment = () => {
    if (newComment === '') return;

    console.log('submitted =>', newComment);
    setNewComment('');
  }

  const inputRef = useRef(null);
  const btnRef = useRef(null);


  return (
    <Overlay isShowing={showComments} currentTopPosition={currentTopPosition} height={'100vh'}> {/*TODO: change height value to something more dynamic */}
      <nav className={commentStyles.nav}>
        <MdOutlineArrowBackIosNew onClick={handleCloseComments} />
        <h3>Comments</h3>
        <FiSend />
      </nav>

      <section className={commentStyles.postDetails}>
        <div>
          <img src={post.postedBy.userAvatar} alt={post.postedBy.userAvatar} />
        </div>
        <div>
          <p><strong>{post.postedBy.userName}</strong> {post.postDescription}</p>
          <p>{moment(post.postedOn).fromNow()}</p>
        </div>
      </section>

      <div className={commentStyles.commentContent}>
        {post.comments.map((comment, idx) => (
          <section key={idx} className={commentStyles.postDetails}>
            <div>
              <img src={comment.userAvatar} alt={comment.userAvatar} />
            </div>
            <div>
              <p><strong>{comment.userName}</strong> {comment.comment}</p>
              <p>{moment(comment.commentedOn).fromNow()} <span>Reply</span></p>
            </div>
            <div>
              <RiHeartLine />
            </div>
          </section>
        ))}
      </div>
      <nav className={commentStyles.footerNav}>
        <img src={'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg'} alt={'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg'} />
        <input ref={inputRef} onChange={(e) => setNewComment(e.target.value)} value={newComment} placeholder='Add a comment as ben_sven_ten' />
        {inputFocused ? (
          <button ref={btnRef} onClick={handleSubmitComment} type='submit'>Post</button>
        ) : null}
      </nav>
    </Overlay>
  )
}

export default Comments