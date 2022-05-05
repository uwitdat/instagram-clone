import React, { useEffect, useState } from 'react';
import navStyles from '../styles/nav-header.module.scss';
import { MdOutlineAddBox } from 'react-icons/md';
import { RiHeartLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import Router from 'next/router';
import { eraseCookie } from '../utils/functions';
import FileUpload from './file-upload/FileUpload';
import Notifications from './notifications/Notifications';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS_FOR_USER, GET_NOTIFS_INT } from '../utils/queries';


const NavHeader = ({ refetchAllPosts, userId }) => {
  const router = Router;
  const COOKIE_NAME = 'JWT';

  const handleUserLogOut = () => {
    router.push('/login');
    eraseCookie(COOKIE_NAME);
  }

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


  const { data: notificationsNotChecked, refetch } = useQuery(GET_NOTIFS_INT,
    {
      variables: { userId }
    })

  return (
    <React.Fragment>
      <nav className={navStyles.nav}>
        <h1>Instagram</h1>
        <ul>
          <li><MdOutlineAddBox onClick={handleShowNewPostModal} /></li>
          <li className={navStyles.notif}>
            <RiHeartLine onClick={handleShowNotifications} />
            {notificationsNotChecked && notificationsNotChecked.getAllUncheckedNotifs > 0 ? (
              <p onClick={handleShowNotifications}>{notificationsNotChecked.getAllUncheckedNotifs}</p>
            ) : null}
          </li>
          <li><FiLogOut onClick={handleUserLogOut} /></li>
        </ul>
      </nav>
      {newPostModal ? (
        <FileUpload refetchAllPosts={refetchAllPosts} open={newPostModal} handleClose={handleCloseNewPostModal} />
      ) : null}

      <Notifications refetchInt={refetch} userId={userId} scrollPosition={scrollPosition} handleHideNotifications={handleHideNotifications} showNotifications={showNotifications} />
    </React.Fragment>
  )

}

export default NavHeader;
