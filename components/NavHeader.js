import React, { useEffect, useState } from 'react';
import navStyles from '../styles/nav-header.module.scss';
import { MdOutlineAddBox } from 'react-icons/md';
import { RiHeartLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import Router from 'next/router';
import { eraseCookie } from '../utils/functions';
import FileUpload from './file-upload/FileUpload';
import Notifications from './notifications/Notifications';

const NavHeader = ({ notifications, currentUser, setCurrentUser, refetchPosts, refetchAllNotis }) => {
  const router = Router;
  const COOKIE_NAME = 'JWT';

  const handleUserLogOut = () => {
    router.push('/login');
    eraseCookie(COOKIE_NAME);
  }

  const [ids, setIds] = useState(null)
  useEffect(() => {
    if (notifications) {
      setIds(notifications.getAllNotificationsForUser.filter((notif) => notif.isChecked === false).map((notif) => Number(notif.id)))
    }
  }, [notifications])

  const [newPostModal, setNewPostModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(null)

  const handleShowNewPostModal = () => setNewPostModal(true);
  const handleCloseNewPostModal = () => setNewPostModal(false);

  const handleShowNotifications = () => {
    setShowNotifications(true)
    setScrollPosition(window.pageYOffset);
  }

  const handleHideNotifications = () => {
    setShowNotifications(false)
  }



  return (
    <React.Fragment>
      <nav className={navStyles.nav}>
        <h1>Instagram</h1>
        <ul>
          <li><MdOutlineAddBox onClick={handleShowNewPostModal} /></li>
          <li className={navStyles.notif}>
            <RiHeartLine onClick={handleShowNotifications} />
            {ids && ids.length > 0 ? (
              <p onClick={handleShowNotifications}>
                {ids.length}
              </p>
            ) : null}
          </li>
          <li><FiLogOut onClick={handleUserLogOut} /></li>
        </ul>
      </nav>
      {newPostModal ? (
        <FileUpload currentUser={currentUser} setCurrentUser={setCurrentUser} refetchPosts={refetchPosts} open={newPostModal} handleClose={handleCloseNewPostModal} />
      ) : null}

      <Notifications
        ids={ids}
        setIds={setIds}
        currentUser={currentUser}
        userId={currentUser.id}
        scrollPosition={scrollPosition}
        handleHideNotifications={handleHideNotifications}
        showNotifications={showNotifications}
        notifications={notifications?.getAllNotificationsForUser}
        refetchAllNotis={refetchAllNotis}
      />
    </React.Fragment>
  )

}

export default NavHeader;
