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
        <li><img src={'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80'} alt='user profile img' /></li>
      </ul>
    </nav>
  )
}

export default NavFooter