import React, { useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { AiOutlineBell, AiOutlineEllipsis } from 'react-icons/ai';
import profileHeaderStyles from '../styles/profile-header.module.scss';
import Link from 'next/link'
import FileUpload from './file-upload/FileUpload';
import { eraseCookie } from '../utils/functions';
import Router from 'next/router';

const ProfilePageNavHeader = ({ currentUser, userIdFromRouter }) => {
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

  return (
    <React.Fragment>
      {Number(currentUser?.id) === userIdFromRouter ? ( // is the current user trying to view their own posts/profile?
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

      ) : (
        <nav className={profileHeaderStyles.otherUserNav}>
          <div>
            <Link href='/home'>
              <MdOutlineArrowBackIosNew className={profileHeaderStyles.backArrow} />
            </Link>
          </div>
          <div>
            <h2>Other User</h2>
          </div>
          <ul>
            <li>
              <AiOutlineBell />
            </li>
            <li>
              <AiOutlineEllipsis />
            </li>
          </ul>
        </nav>
      )}
    </React.Fragment>
  )
}

export default ProfilePageNavHeader;