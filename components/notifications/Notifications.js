import React, { useState, useEffect, useMemo } from 'react';
import Overlay from '../Overlay';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import notificationStyles from '../../styles/notifications.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { FLIP_IS_CHECKED } from '../../utils/mutations';
import { GET_NOTIFICATIONS_FOR_USER } from '../../utils/queries';
import { Spinner } from '../Spinner';
import LikedYourPost from './LikedYourPost';
import Commented from './Commented';
import StartedFollowingYou from './StartedFollowingYou';

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

  useEffect(() => {
    if (ids) {
      flipValues();
    }
  }, [ids])


  const notifs = useMemo(() => {
    if (notifications && notifications.getAllNotificationsForUser) {
      return notifications.getAllNotificationsForUser.map((notif) => {

        if (notif.notificationType === 'liked your post') {
          return <LikedYourPost notif={notif} key={notif.id} />
        } else if (notif.notificationType === 'commented:') {
          return <Commented notif={notif} key={notif.id} />
        } else if (notif.notificationType === 'started following you') {
          return <StartedFollowingYou notif={notif} key={notif.id} />
        }
      })
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
          {notifs}
        </section>
      )}

    </Overlay>
  )
}

export default Notifications