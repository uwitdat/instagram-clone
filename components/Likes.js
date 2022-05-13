import React, { useEffect, useState } from 'react';
import likeStyles from '../styles/likes.module.scss';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import Overlay from './Overlay';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { FOLLOW_USER, UNFOLLOW_USER } from '../utils/mutations';

const Likes = ({ currentUser, showLikes, setShowLikes, currentTopPosition, likes }) => {
  const handleCloseLikes = () => setShowLikes(false)
  const [isFollowing, setIsFollowing] = useState(null)
  const router = useRouter();

  const handleGoToProfile = (like) => {
    if (like.likedBy.id === currentUser.id) {
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
          followedByUserId: Number(currentUser.id),
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
          userId: Number(currentUser.id),
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
    const doesCurrentUserFollow = currentUser.following.some(following => idsInPostLikes.indexOf(Number(following.id)) >= 0)
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
              <img onClick={() => handleGoToProfile(like)} src={like.likedBy.avatar ? like.likedBy.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt={like.likedBy.avatar} />
              <div>
                <h3 onClick={() => handleGoToProfile(like)}>{like.likedBy.userName}</h3>
                <p>{like.likedBy.name}</p>
              </div>
            </div>
            <div>
              {like.likedBy.id === currentUser.id ? (null) : (
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