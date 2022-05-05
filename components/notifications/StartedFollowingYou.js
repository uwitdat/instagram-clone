import React, { useState, useEffect } from 'react'
import notificationStyles from '../../styles/notifications.module.scss';
import moment from 'moment';
import { useAppContext } from '../../context/index';
import { useRouter } from 'next/router';
import { handleRouteToProfile } from './utils';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';


const StartedFollowingYou = ({ notif }) => {
  const [isFollowing, setIsFollowing] = useState(null);
  const [state] = useAppContext();
  const router = useRouter();

  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);


  const handleFollowUser = async () => {
    if (isFollowing) {
      try {
        const { data } = await unfollowUser({
          variables: {
            userId: Number(state.currentUser.id),
            userIdToUnfollow: Number(notif.fromUser.id)
          }
        });
        if (data) {
          console.log('data', data)
          setIsFollowing(false);
        }
      } catch (err) {
        console.log(err.message)
      }

    } else {
      try {
        const { data } = await followUser({
          variables: {
            followedByUserId: Number(state.currentUser.id),
            followingUserId: Number(notif.fromUser.id)
          }
        });
        if (data) {
          console.log('data', data)
          setIsFollowing(true);
        }
      } catch (err) {
        console.log(err.message)
      }
    }
  }


  const handleViewProfile = () => {
    if (handleRouteToProfile(notif, state)) {
      router.push('/profile')
    } else {
      router.push({
        pathname: `/profile/${notif.fromUser.id}`,
        query: { postFromUser: JSON.stringify(notif.fromUser) }
      })
    }
  }



  useEffect(() => {
    const followingIds = state.currentUser.following.map((follow) => follow.id)

    if (followingIds.includes(notif.fromUser.id)) {
      setIsFollowing(true)
    } else {
      setIsFollowing(false)
    }
  }, [])


  return (
    <div key={notif.id} className={notificationStyles.notification}>
      <img onClick={handleViewProfile} className={notificationStyles.userImg} src={notif.fromUser.avatar} alt={notif.fromUser.avatar} />
      <p>
        <strong onClick={handleViewProfile}>{notif.fromUser.userName}</strong>
        {' '}
        {notif.notificationType}.
        {' '}
        <span>{moment(notif.createdAt).fromNow()}</span>
      </p>
      {isFollowing ? (
        <button className={notificationStyles.followingBtn} onClick={handleFollowUser}>Following</button>
      ) : (
        <button className={notificationStyles.followBtn} onClick={handleFollowUser}>Follow</button>
      )}

    </div>
  )
}

export default StartedFollowingYou