import React from 'react';
import notificationStyles from '../../styles/notifications.module.scss';
import moment from 'moment';
import { handleRouteToProfile } from './utils';
import { useRouter } from 'next/router';

const Commented = ({ notif, currentUser }) => {
  const router = useRouter();

  const handleViewProfile = () => {
    if (handleRouteToProfile(notif, currentUser)) {
      router.push('/profile');

    } else {
      router.push({
        pathname: `/profile/${notif.fromUser.id}`,
        query: { postFromUser: JSON.stringify(notif.fromUser) }
      })
    }
  }

  const handleViewPost = () => {
    const idxOfPost = currentUser.posts.findIndex(post => post.id === notif.onPost.id);

    const props = {
      showPosts: true,
      idxOfPost: idxOfPost
    }

    router.push({
      pathname: '/profile',
      query: {
        props: JSON.stringify(props),
        currentUser: JSON.stringify(currentUser),
      }
    })
  }

  return (
    <div key={notif.id} className={notificationStyles.notification}>
      <img onClick={handleViewProfile} className={notificationStyles.userImg} src={notif.fromUser.avatar ? notif.fromUser.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt={notif.fromUser.avatar} />
      <p>
        <strong onClick={handleViewProfile}>{notif.fromUser.userName}</strong>
        {' '}
        {notif.notificationType} {notif.commentContent}
        {' '}
        <span>{moment(notif.createdAt).fromNow()}</span>
      </p>
      <img onClick={handleViewPost} className={notificationStyles.postImg} src={notif.onPost.postContent} alt={notif.onPost.postContent} />
    </div>
  )
}

export default Commented