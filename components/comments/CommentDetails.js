import React from 'react';
import commentStyles from '../../styles/comments.module.scss';
import moment from 'moment';
import { FiSend } from 'react-icons/fi';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

const CommentDetails = ({ post, postFromUser, handleCloseComments }) => {
  return (
    <React.Fragment>
      <nav className={commentStyles.nav}>
        <MdOutlineArrowBackIosNew onClick={handleCloseComments} />
        <h3>Comments</h3>
        <FiSend />
      </nav>

      <section className={commentStyles.postDetails}>
        <div>
          <img src={postFromUser.avatar} alt={postFromUser.avatar} />
        </div>
        <div>
          <p><strong>{postFromUser.userName}</strong> {post.postDescription}</p>
          <p>{moment(post.createdAt).fromNow()}</p>
        </div>
      </section>
    </React.Fragment>

  )
}

export default CommentDetails