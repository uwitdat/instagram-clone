import React from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import profileHeaderStyles from '../styles/profile-header.module.scss';

const ProfileHeaderForCurrentUser = ({ userName }) => {
  return (
    <nav className={profileHeaderStyles.nav}>
      <div>
        <h2>{userName}</h2>
      </div>
      <ul>
        <li>
          <MdOutlineAddBox />
        </li>
        <li>
          <GiHamburgerMenu />
        </li>
      </ul>
    </nav>
  )
}

export default ProfileHeaderForCurrentUser;