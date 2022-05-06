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
          <img src={postFromUser.avatar ? postFromUser.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt={postFromUser.avatar} />
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