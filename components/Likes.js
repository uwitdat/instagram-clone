import React, { useEffect, useState } from 'react';
import likeStyles from '../styles/likes.module.scss';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import Overlay from './Overlay';
import { useAppContext } from '../context';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { FOLLOW_USER, UNFOLLOW_USER } from '../utils/mutations';

const Likes = ({ showLikes, setShowLikes, currentTopPosition, likes }) => {
  const handleCloseLikes = () => setShowLikes(false)
  const [isFollowing, setIsFollowing] = useState(null)


  const [state, setState] = useAppContext();
  const router = useRouter();

  const handleGoToProfile = (like) => {
    if (like.likedBy.id === state.currentUser.id) {
      router.push('/profile')
    } else {
      router.push({
        pathname: `/profile/${like.likedBy.id}`,
        query: { postFromUser: JSON.stringify(like.likedBy) }
      })
    }
  }


  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const handleFollowUser = async (likedByUserId) => {
    try {
      await followUser({
        variables: {
          followedByUserId: Number(state.currentUser.id),
          followingUserId: Number(likedByUserId)
        }
      })
    } catch (err) {
      console.log(err)
    }
    setIsFollowing(!isFollowing)
  }

  const handleUnfollowUser = async (likedByUserId) => {
    try {
      await unfollowUser({
        variables: {
          userId: Number(state.currentUser.id),
          userIdToUnfollow: Number(likedByUserId)
        }
      })
    } catch (err) {
      console.log(err)
    }
    setIsFollowing(!isFollowing)
  }

  const checkIsFollowing = () => {
    const idsInPostLikes = likes.map((like) => like.likedByUserId)
    const doesCurrentUserFollow = state.currentUser.following.some(following => idsInPostLikes.indexOf(Number(following.id)) >= 0)
    setIsFollowing(doesCurrentUserFollow)
  }

  useEffect(() => {
    checkIsFollowing()
  }, [])



  return (
    <Overlay isShowing={showLikes} currentTopPosition={currentTopPosition} height={'94.3vh'}> {/*TODO: change height value to something more dynamic */}
      <nav className={likeStyles.nav}>
        <MdOutlineArrowBackIosNew onClick={handleCloseLikes} />
        <h3>Likes</h3>
      </nav>

      <div className={likeStyles.likeContent}>
        {likes && likes.map((like, idx) => (
          <div className={likeStyles.like} key={idx}>
            <div>
              <img onClick={() => handleGoToProfile(like)} src={like.likedBy.avatar} alt={like.likedBy.avatar} />
              <div>
                <h3 onClick={() => handleGoToProfile(like)}>{like.likedBy.userName}</h3>
                <p>{like.likedBy.name}</p>
              </div>
            </div>
            <div>
              {like.likedBy.id === state?.currentUser?.id ? (null) : (
                isFollowing ? (
                  <button onClick={() => handleUnfollowUser(like.likedByUserId)} id={likeStyles.unfollowBtn}>Unfollow</button>
                ) : (
                  <button onClick={() => handleFollowUser(like.likedByUserId)}>Follow</button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </Overlay>
  )
}

export default Likes