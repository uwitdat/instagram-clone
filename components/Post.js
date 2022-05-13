import React, { useState, useEffect } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import moment from 'moment';
import { useRouter } from 'next/router'
import postStyles from '../styles/home.module.scss';
import { AiOutlineEllipsis } from 'react-icons/ai';
import PostOptionsMenu from './PostOptionsMenu';
import { REMOVE_LIKE_FROM_POST, CREATE_LIKE_FOR_POST } from '../utils/mutations';
import { GET_POSTS_FROM_USER } from '../utils/queries';
import { useMutation, useLazyQuery } from '@apollo/client';
import Comments from '../components/comments/Comments';
import Likes from './Likes';
import Image from 'next/image';


const redColor = 'rgb(255, 93, 93)';

const Post = ({ post, postFromUser, handleClosePosts, currentUser, setCurrentUser, resetUser, setPosts }) => {
  const [showComments, setShowComments] = useState(false)
  const [showLikes, setShowLikes] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(null);
  const router = useRouter();
  const currentPath = router.pathname;

  const [userPost, setUserPost] = useState(post);

  const [liked, setLiked] = useState(null);


  const [postsByUser] = useLazyQuery(GET_POSTS_FROM_USER)

  const [removeLike] = useMutation(REMOVE_LIKE_FROM_POST);
  const [createLikeForPost] = useMutation(CREATE_LIKE_FOR_POST);

  const handleSetLike = () => {
    if (liked) {
      handleRemoveLike()
    } else {
      handleAddLike()
    }
  }

  const handleRemoveLike = async () => {
    try {
      const { data } = await removeLike({
        variables: {
          likeOnPostId: Number(userPost.id),
          likedByUserId: Number(currentUser.id)
        }
      });
      if (data) {
        setUserPost({
          ...userPost,
          likes: userPost.likes.filter((like) => Number(like.likedBy.id) !== Number(currentUser.id))
        })
        if (resetUser !== undefined) {
          resetUser();
        }
        setAnimateRemoveLike(true);
        setTimeout(() => { setAnimateRemoveLike(false) }, 800);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddLike = async () => {
    try {
      const { data } = await createLikeForPost({
        variables: {
          likeOnPostId: Number(userPost.id),
          likedByUserId: Number(currentUser.id),
          likeForUserId: Number(postFromUser.id)
        }
      });
      if (data) {
        console.log(data.createLikeForPost)
        setUserPost({
          ...userPost,
          likes: [data.createLikeForPost, ...userPost.likes]
        })
        if (resetUser !== undefined) {
          resetUser();
        }

        setAnimateLike(true);
        setTimeout(() => { setAnimateLike(false) }, 800);
      }
    } catch (err) {
      console.log(err)
    }
  }


  const handleViewComments = () => {
    setScrollPosition(window.pageYOffset);
    setShowComments(true)
  }

  const handleViewLikes = () => {
    setScrollPosition(window.pageYOffset);
    setShowLikes(true)
  }


  const [animateLike, setAnimateLike] = useState(false)
  const [animateRemoveLike, setAnimateRemoveLike] = useState(false)

  const handleRedirectToProfile = () => {
    if (postFromUser.id === currentUser.id) {
      router.push({
        pathname: '/profile',
        query: { currentUser: JSON.stringify(currentUser) }
      },
        '/profile'
      )
    } else {
      router.push({
        pathname: `/profile/${postFromUser.id}`,
        query: { postFromUser: JSON.stringify(postFromUser) }
      },
        `/profile/${postFromUser.id}`
      )
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openPostOptionsMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    if (userPost) {
      const ids = userPost.likes.map((like) => like.likedByUserId)
      setLiked(ids.includes(Number(currentUser.id)))
    }
  }, [userPost])

  return (
    <div className={postStyles.postContainer}>
      <div>
        <img
          src={postFromUser.avatar ? postFromUser.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'}
          alt={postFromUser.avatar}
          onClick={handleRedirectToProfile}
        />


        <h4 onClick={handleRedirectToProfile}>{postFromUser.userName}</h4>
        {postFromUser.id === currentUser.id && currentPath === '/profile' ? (
          <AiOutlineEllipsis onClick={(e) => openPostOptionsMenu(e)} />
        ) : null}

        <PostOptionsMenu
          postId={post.id}
          open={open}
          anchorEl={anchorEl}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          handleClose={handleClose}
          handleClosePosts={handleClosePosts} />

      </div>
      <div className={postStyles.postContent}>
        <Image
          style={{ cursor: 'pointer' }}
          onDoubleClick={handleSetLike}
          src={post.postContent}
          alt={post.postContent}
          layout={'fill'}
          objectFit={'cover'}

        />
        <RiHeartFill
          className={postStyles.like}
          id={animateLike ? postStyles.showLike : ''}
        />
      </div>

      <div className={postStyles.actionItems}>

        {liked ? (
          <RiHeartFill
            onClick={handleSetLike}
            style={{ color: redColor }}
          />
        ) : (
          <RiHeartLine
            onClick={handleSetLike}
          />
        )}

        <FaRegComment onClick={handleViewComments} />
        <FiSend />
      </div>

      <div className={postStyles.details}>
        {post && post.likes.length > 0 ? (
          <p>Liked by <strong>{post.likes[0].likedBy.userName}</strong> and <strong onClick={handleViewLikes} style={{ cursor: 'pointer' }}>others</strong></p>
        ) : null}

        <p><strong>{postFromUser.userName}</strong> {post.postDescription}</p>

        {post ? (
          post.comments.length === 0 ? <p style={{ marginTop: '-.1rem' }}></p> : (
            post.comments.length > 1 ? (
              <p className={postStyles.viewComments} onClick={handleViewComments}>View all {post.comments.length} comments</p>
            ) : (
              <p className={postStyles.viewComments} onClick={handleViewComments}>View {post.comments.length} comment</p>
            )
          )
        ) : null}
        <p style={{ fontSize: '.7rem' }}>{moment(post.createdAt).fromNow()}</p>
      </div>


      {post ? (
        <Comments
          showComments={showComments}
          setShowComments={setShowComments}
          currentTopPosition={scrollPosition}
          post={post}
          setPost={setUserPost}
          postFromUser={postFromUser}
          currentUser={currentUser}
          resetUser={resetUser}
          setPosts={setPosts}
        />
      ) : null}

      {userPost ? (
        <Likes
          showLikes={showLikes}
          setShowLikes={setShowLikes}
          currentTopPosition={scrollPosition}
          likes={userPost.likes}
          currentUser={currentUser}
        />
      ) : null}
    </div>
  )
}

export default Post