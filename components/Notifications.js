import React from 'react';
import Overlay from './Overlay';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import notificationStyles from '../styles/notifications.module.scss';

const Notifications = ({ showNotifications, handleHideNotifications, scrollPosition }) => {

  return (
    <Overlay isShowing={showNotifications} currentTopPosition={scrollPosition} height={'100vh'}>
      <nav className={notificationStyles.nav}>
        <MdOutlineArrowBackIosNew onClick={handleHideNotifications} />
        <h3>Activity</h3>
      </nav>
    </Overlay>
  )
}

export default Notifications