import React from 'react';
import notificationStyles from '../../styles/notifications.module.scss';
import moment from 'moment';
import { handleRouteToProfile } from './utils';
import { useAppContext } from '../../context';
import { useRouter } from 'next/router';

const Commented = ({ notif }) => {
  const [state] = useAppContext();
  const router = useRouter();

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

  return (
    <div key={notif.id} className={notificationStyles.notification}>
      <img onClick={handleViewProfile} className={notificationStyles.userImg} src={notif.fromUser.avatar} alt={notif.fromUser.avatar} />
      <p>
        <strong onClick={handleViewProfile}>{notif.fromUser.userName}</strong>
        {' '}
        {notif.notificationType} {notif.commentContent}
        {' '}
        <span>{moment(notif.createdAt).fromNow()}</span>
      </p>
      <img className={notificationStyles.postImg} src={notif.onPost.postContent} alt={notif.onPost.postContent} />
    </div>
  )
}

export default Commented