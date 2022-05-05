import React from 'react';
import notificationStyles from '../../styles/notifications.module.scss';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useAppContext } from '../../context';
import { handleRouteToProfile } from './utils';

const LikedYourPost = ({ notif }) => {
  const [state] = useAppContext();
  const router = useRouter();

  const handleViewProfile = () => {
    if (handleRouteToProfile(notif, state)) {
      router.push('/profile')
    } else {
      router.push({
        pathname: `/profile/${notif.fromUser.id}`,
        query: {
          postFromUser: JSON.stringify(notif.fromUser)
        }
      })
    }
  }

  const handleViewPost = () => {
    const idxOfPost = notif.fromUser.posts.findIndex(post => post.id === notif.onPost.id);

    const props = {
      showPosts: true,
      idxOfPost: idxOfPost
    }

    router.push({
      pathname: '/profile',
      query: {
        props: JSON.stringify(props)
      }
    })
  }

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
      <img onClick={handleViewPost} className={notificationStyles.postImg} src={notif.onPost.postContent} alt={notif.onPost.postContent} />
    </div>
  )
}

export default LikedYourPost