import React from 'react'
import commentStyles from '../styles/comments.module.scss';
import { FiSend } from 'react-icons/fi';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { RiHeartLine } from 'react-icons/ri';
import moment from 'moment';

const Comments = ({ showComments, setShowComments, currentTopPosition, post }) => {

  const handleCloseComments = () => setShowComments(false)

  console.log('post', post)

  return (
    <div className={showComments ? commentStyles.showComments : commentStyles.comments} style={{ top: `${currentTopPosition}px` }}>
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
        {post.comments.map((comment) => (
          <section className={commentStyles.postDetails}>
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

    </div>
  )
}

export default Comments