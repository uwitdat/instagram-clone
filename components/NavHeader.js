import React, { useState } from 'react';
import navStyles from '../styles/nav-header.module.scss';
import { MdOutlineAddBox } from 'react-icons/md';
import { RiHeartLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import Router from 'next/router';
import { eraseCookie } from '../utils/functions';
import FileUpload from './file-upload/FileUpload';


const NavHeader = () => {
  const router = Router;
  const COOKIE_NAME = 'JWT';

  const handleUserLogOut = () => {
    router.push('/login');
    eraseCookie(COOKIE_NAME);
  }

  const [newPostModal, setNewPostModal] = useState(false);

  const handleShowNewPostModal = () => setNewPostModal(true);
  const handleCloseNewPostModal = () => setNewPostModal(false);

  return (
    <React.Fragment>
      <nav className={navStyles.nav}>
        <h1>Instagram</h1>
        <ul>
          <li><MdOutlineAddBox onClick={handleShowNewPostModal} /></li>
          <li><RiHeartLine /></li>
          <li><FiLogOut onClick={handleUserLogOut} /></li>
        </ul>
      </nav>
      {newPostModal ? (
        <FileUpload open={newPostModal} handleClose={handleCloseNewPostModal} />
      ) : null}

    </React.Fragment>
  )
}

export default NavHeader;
