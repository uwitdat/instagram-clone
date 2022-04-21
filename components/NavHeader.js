import React from 'react';
import navStyles from '../styles/nav-header.module.scss';
import { MdOutlineAddBox } from 'react-icons/md';
import { RiHeartLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import Router from 'next/router';
import { eraseCookie } from '../utils/functions';

const NavHeader = () => {
  const router = Router;
  const COOKIE_NAME = 'JWT';

  const handleUserLogOut = () => {
    router.push('/login');
    eraseCookie(COOKIE_NAME);
  }

  return (
    <nav className={navStyles.nav}>
      <h1>Instagram</h1>
      <ul>
        <li><MdOutlineAddBox /></li>
        <li><RiHeartLine /></li>
        <li><FiLogOut onClick={handleUserLogOut} /></li>
      </ul>
    </nav>
  )
}

export default NavHeader;