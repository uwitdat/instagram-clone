import React, { useState, useEffect } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import moment from 'moment';
import { useRouter } from 'next/router'
import postStyles from '../styles/home.module.scss';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useAppContext } from '../context';
import PostOptionsMenu from './PostOptionsMenu';
import { GET_COMMENTS_FOR_POST, GET_ALL_LIKES_FOR_POST } from '../utils/queries';
import { REMOVE_LIKE_FROM_POST, CREATE_LIKE_FOR_POST } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Comments from '../components/comments/Comments';
import Likes from './Likes';
import Image from 'next/image';

const redColor = 'rgb(255, 93, 93)';

const Post = ({ post, postFromUser, handleClosePosts }) => {
  const [showComments, setShowComments] = useState(false)
  const [showLikes, setShowLikes] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(null);
  const router = useRouter()
  const currentPath = router.pathname

  const [liked, setLiked] = useState(false)

  const { data: commentsData, error, refetch } = useQuery(GET_COMMENTS_FOR_POST, {
    variables: { postId: post.id },
  })


  const { data: likesData, error: likesError, refetch: refetchLikes } = useQuery(GET_ALL_LIKES_FOR_POST, {
    variables: { postId: post.id },
  })


  const [removeLike] = useMutation(REMOVE_LIKE_FROM_POST)
  const [createLikeForPost] = useMutation(CREATE_LIKE_FOR_POST)

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
          likeOnPostId: Number(post.id),
          likedByUserId: Number(state.currentUser.id)
        }
      });
      if (data) {
        setLiked(false)
        setAnimateRemoveLike(true)
        setTimeout(() => { setAnimateRemoveLike(false) }, 800)
        refetchLikes()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddLike = async () => {
    try {
      const { data } = await createLikeForPost({
        variables: {
          likeOnPostId: Number(post.id),
          likedByUserId: Number(state.currentUser.id)
        }
      });
      if (data) {
        setLiked(true)
        setAnimateLike(true)
        setTimeout(() => { setAnimateLike(false) }, 800)
        refetchLikes()
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


  const [state] = useAppContext();

  const [animateLike, setAnimateLike] = useState(false)
  const [animateRemoveLike, setAnimateRemoveLike] = useState(false)


  const handleRedirectToProfile = () => {
    if (postFromUser.id === state.currentUser.id) {
      router.push({
        pathname: '/profile'
      })
    } else {
      router.push({
        pathname: `/profile/${postFromUser.id}`,
        query: { postFromUser: JSON.stringify(postFromUser) }
      })
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
    if (likesData && likesData.getLikesForPost) {
      likesData.getLikesForPost.some((like) => {
        setLiked(like.likedByUserId === Number(state?.currentUser?.id))
      })
    }
  }, [likesData])

  return (
    <div className={postStyles.postContainer}>
      <div>
        <img
          src={postFromUser.avatar}
          alt={postFromUser.avatar}
          onClick={handleRedirectToProfile}
        />

        <h4 onClick={handleRedirectToProfile}>{postFromUser.userName}</h4>
        {postFromUser.id === state.currentUser.id && currentPath === '/profile' ? (
          <AiOutlineEllipsis onClick={(e) => openPostOptionsMenu(e)} />
        ) : null}

        <PostOptionsMenu postId={post.id} open={open} anchorEl={anchorEl} handleClose={handleClose} handleClosePosts={handleClosePosts} />

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
        {likesData && likesData.getLikesForPost && likesData.getLikesForPost.length > 0 ? (
          <p>Liked by <strong>{likesData.getLikesForPost[0].likedBy.userName}</strong> and <strong onClick={handleViewLikes} style={{ cursor: 'pointer' }}>others</strong></p>
        ) : null}

        <p><strong>{postFromUser.userName}</strong> {post.postDescription}</p>

        {commentsData && commentsData.getCommentsForPost ? (
          commentsData.getCommentsForPost.length === 0 ? <p style={{ marginTop: '-.1rem' }}></p> : (
            commentsData.getCommentsForPost.length > 1 ? (
              <p className={postStyles.viewComments} onClick={handleViewComments}>View all {commentsData.getCommentsForPost.length} comments</p>
            ) : (
              <p className={postStyles.viewComments} onClick={handleViewComments}>View {commentsData.getCommentsForPost.length} comment</p>
            )
          )
        ) : null}
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>


      {commentsData && commentsData.getCommentsForPost ? (
        <Comments
          showComments={showComments}
          setShowComments={setShowComments}
          currentTopPosition={scrollPosition}
          comments={commentsData.getCommentsForPost}
          post={post}
          postFromUser={postFromUser}
          refetchComments={refetch}
        />
      ) : null}

      {likesData && likesData.getLikesForPost ? (
        <Likes
          showLikes={showLikes}
          setShowLikes={setShowLikes}
          currentTopPosition={scrollPosition}
          likes={likesData.getLikesForPost} />
      ) : null}
    </div>
  )
}

export default Post