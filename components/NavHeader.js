import React, { useEffect, useState } from 'react';
import navStyles from '../styles/nav-header.module.scss';
import { MdOutlineAddBox } from 'react-icons/md';
import { RiHeartLine } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';

const NavHeader = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setIsScrolling(window.pageYOffset > 70)
      );
    }
  }, []);

  return (
    <nav className={isScrolling ? `${navStyles.nav} ${navStyles.navIsScrolling}` : `${navStyles.nav}`}>
      <h1>Instagram</h1>
      <ul>
        <li><MdOutlineAddBox /></li>
        <li><RiHeartLine /></li>
        <li><FiSend /></li>
      </ul>
    </nav>
  )
}

export default NavHeader;