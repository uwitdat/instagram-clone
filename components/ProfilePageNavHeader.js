import React from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { AiOutlineBell, AiOutlineEllipsis } from 'react-icons/ai';
import profileHeaderStyles from '../styles/profile-header.module.scss';
import Link from 'next/link'

const ProfilePageNavHeader = ({ currentUser, userIdFromRouter }) => {
  return (
    <React.Fragment>
      {currentUser.id === userIdFromRouter ? ( // is the current user trying to view their own posts/profile?
        <nav className={profileHeaderStyles.nav}>
          <div>
            <h2>{currentUser.userName}</h2>
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