import React from 'react';
import navStyles from '../styles/nav-footer.module.scss';
import { AiOutlineHome, AiFillHome, AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';

const NavFooter = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li><AiOutlineHome /></li>
        <li><AiOutlineSearch /></li>
        <li><BiMoviePlay /></li>
        <li><AiOutlineShopping /></li>
        <li><img src={'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg'} alt='user profile img' /></li>
      </ul>
    </nav>
  )
}

export default NavFooter