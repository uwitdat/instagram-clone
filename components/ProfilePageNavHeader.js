import React, { useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import profileHeaderStyles from '../styles/profile-header.module.scss';
import FileUpload from './file-upload/FileUpload';
import { eraseCookie } from '../utils/functions';
import Router from 'next/router';

const ProfilePageNavHeader = ({ currentUser }) => {
  const router = Router;
  const COOKIE_NAME = 'JWT';

  const [newPostModal, setNewPostModal] = useState(false);

  const handleShowNewPostModal = () => {
    setNewPostModal(true);
  };

  const handleCloseNewPostModal = () => setNewPostModal(false);

  const handleUserLogOut = () => {
    router.push('/login');
    eraseCookie(COOKIE_NAME);
  }

  if (!currentUser) return <div />

  return (
    <nav className={profileHeaderStyles.nav}>
      <div>
        <h2>{currentUser.userName}</h2>
      </div>
      <ul>
        <li>
          <MdOutlineAddBox onClick={handleShowNewPostModal} />
        </li>
        <li>
          <FiLogOut onClick={handleUserLogOut} />
        </li>
      </ul>
      {newPostModal ? (
        <FileUpload open={newPostModal} handleClose={handleCloseNewPostModal} />
      ) : null}
    </nav>
  )
}

export default ProfilePageNavHeader;