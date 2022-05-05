import React, { useState, useEffect } from 'react';
import Overlay from './Overlay';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import notificationStyles from '../styles/notifications.module.scss';
import moment from 'moment';
import { useMutation, useQuery } from '@apollo/client';
import { FLIP_IS_CHECKED } from '../utils/mutations';
import { GET_NOTIFICATIONS_FOR_USER } from '../utils/queries';
import { Spinner } from './Spinner';

const Notifications = ({ showNotifications, handleHideNotifications, scrollPosition, userId, refetchInt }) => {


  const handleCloseNotifs = async () => {
    const res = await flipValues()
    if (res) {
      refetchInt()
      refetchNotifs()
      setTimeout(() => { handleHideNotifications() }, 200)
    }
  }

  const [flipIsCheckedValues] = useMutation(FLIP_IS_CHECKED)
  const [ids, setIds] = useState(null)

  const flipValues = async () => {
    try {
      const { data } = await flipIsCheckedValues({
        variables: {
          ids: {
            ids
          }
        }
      })
      if (data) {
        return true
      }
    } catch (err) {
      console.log(err.messsage)
    }
  }

  const { data: notifications, isLoading, refetch: refetchNotifs } = useQuery(GET_NOTIFICATIONS_FOR_USER,
    {
      variables: { userId }
    })


  useEffect(() => {
    if (notifications) {
      setIds(notifications.getAllNotificationsForUser.filter((notif) => notif.isChecked === false).map((notif) => Number(notif.id)))
    }
  }, [notifications])


  return (
    <Overlay isShowing={showNotifications} currentTopPosition={scrollPosition} height={'94.5vh'}>
      <nav className={notificationStyles.nav}>
        <MdOutlineArrowBackIosNew onClick={handleCloseNotifs} />
        <h3>Activity</h3>
      </nav>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className={notificationStyles.container}>
          {notifications && notifications.getAllNotificationsForUser.map((notif) => (
            <div key={notif.id} className={notificationStyles.notification}>
              <img className={notificationStyles.userImg} src={notif.fromUser.avatar} alt={notif.fromUser.avatar} />
              <p><strong>{notif.fromUser.userName}</strong> {notif.notificationType}. <span>{moment(notif.createdAt).fromNow()}</span></p>
              <img className={notificationStyles.postImg} src={notif.onPost.postContent} alt={notif.onPost.postContent} />
            </div>
          ))}
        </section>
      )}

    </Overlay>
  )
}

export default Notifications