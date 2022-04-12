import React from 'react';
import { RiHeartLine } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import moment from 'moment';
import postStyles from '../styles/home.module.scss';

const Post = ({ post, handleViewcomments }) => {
  return (
    <div className={postStyles.postContainer}>

      <div>
        <img src={post.postedBy.userAvatar} alt={post.postedBy.userAvatar} />
        <h4>{post.postedBy.userName}</h4>
      </div>
      <div className={postStyles.postContent}>
        <img src={post.postContent} alt={post.postContent} />
      </div>

      <div className={postStyles.actionItems}>
        <RiHeartLine />
        <FaRegComment onClick={() => handleViewcomments(post)} />
        <FiSend />
      </div>

      <div className={postStyles.details}>
        <p>Liked by <strong>{post.likedBy[0].userName}</strong> and <strong style={{ cursor: 'pointer' }}>others</strong></p>
        <p><strong>{post.postedBy.userName}</strong> {post.postDescription}</p>

        {post.comments.length === 0 ? <p style={{ marginTop: '-.1rem' }}></p> : (
          post.comments.length > 1 ? (
            <p onClick={() => handleViewcomments(post)}>View all {post.comments.length} comments</p>
          ) : (
            <p onClick={() => handleViewcomments(post)}>View {post.comments.length} comment</p>
          )
        )}
        <p>{moment(post.postedOn).fromNow()}</p>
      </div>

    </div>
  )
}

export default Post