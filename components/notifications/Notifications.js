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

const Notifications = ({ setIds, ids, refetchAllNotis, notifications, currentUser, showNotifications, handleHideNotifications, scrollPosition, isLoading, refetchUncheckedNotifs }) => {

  const handleCloseNotifs = async () => {
    setTimeout(() => { handleHideNotifications() }, 200)
  }

  const [flipIsCheckedValues] = useMutation(FLIP_IS_CHECKED)

  const handleResetValues = async () => {
    await flipIsCheckedValues({
      variables: {
        ids: {
          ids
        }
      }
    })
    setIds(null);
    setTimeout(() => { refetchAllNotis() }, 500);
  }

  useEffect(() => {
    if (showNotifications) {
      ids.length > 0 ? handleResetValues() : null;
    }

  }, [showNotifications])



  const notifs = useMemo(() => {
    if (notifications) {
      return notifications.map((notif) => {

        if (notif.notificationType === 'liked your post') {
          return <LikedYourPost notif={notif} key={notif.id} currentUser={currentUser} />
        } else if (notif.notificationType === 'commented:') {
          return <Commented notif={notif} key={notif.id} currentUser={currentUser} />
        } else if (notif.notificationType === 'started following you') {
          return <StartedFollowingYou notif={notif} key={notif.id} currentUser={currentUser} />
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