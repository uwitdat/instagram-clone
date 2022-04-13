import React from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { AiOutlineBell, AiOutlineEllipsis } from 'react-icons/ai';
import Link from 'next/link'
import profileHeaderStyles from '../styles/profile-header.module.scss';

const ProfileHeaderForOtherUsers = () => {
  return (
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
  )
}

export default ProfileHeaderForOtherUsers