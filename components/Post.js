import React, { useState } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import moment from 'moment';
import postStyles from '../styles/home.module.scss';

const redColor = 'rgb(255, 93, 93)';

const Post = ({ post, handleViewComments, handleViewLikes }) => {
  const likedOptions = [true, false];
  const [liked, setLiked] = useState(likedOptions[Math.floor(Math.random() * likedOptions.length)]); // temp for now to randomize liked/ not liked
  const handleAddLike = () => setLiked(!liked);

  return (
    <div className={postStyles.postContainer}>
      <div>
        <img src={post.postedBy.userAvatar} alt={post.postedBy.userAvatar} />
        <h4>{post.postedBy.userName}</h4>
      </div>
      <div className={postStyles.postContent}>
        <img onDoubleClick={handleAddLike} src={post.postContent} alt={post.postContent} />
        <RiHeartFill className={liked ? `${postStyles.like} ${postStyles.showLike}` : postStyles.like} />
      </div>

      <div className={postStyles.actionItems}>
        {liked ? (
          <RiHeartFill onClick={handleAddLike} style={{ color: redColor }} className={postStyles.switchHeartIcon} />
        ) : (
          <RiHeartLine onClick={handleAddLike} className={postStyles.switchHeartIcon} />
        )}

        <FaRegComment onClick={() => handleViewComments(post)} />
        <FiSend />
      </div>

      <div className={postStyles.details}>
        <p>Liked by <strong>{post.likedBy[0].userName}</strong> and <strong onClick={() => handleViewLikes(post.likedBy)} style={{ cursor: 'pointer' }}>others</strong></p>
        <p><strong>{post.postedBy.userName}</strong> {post.postDescription}</p>

        {post.comments.length === 0 ? <p style={{ marginTop: '-.1rem' }}></p> : (
          post.comments.length > 1 ? (
            <p onClick={() => handleViewComments(post)}>View all {post.comments.length} comments</p>
          ) : (
            <p onClick={() => handleViewComments(post)}>View {post.comments.length} comment</p>
          )
        )}
        <p>{moment(post.postedOn).fromNow()}</p>
      </div>
    </div>
  )
}

export default Post