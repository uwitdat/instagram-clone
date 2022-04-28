import React from 'react';
import Link from 'next/link'
import navStyles from '../styles/nav-footer.module.scss';
import { AiOutlineHome, AiFillHome, AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { useRouter } from 'next/router'
import { getCurrentUser } from '../hooks';

const NavFooter = () => {
  const router = useRouter()
  const HOME_ROUTE = '/';
  const [state] = getCurrentUser();

  const currentPath = router.asPath;
  const currrentUserProfilePath = state.currentUser?.id ? `/profile` : null;

  const handleViewProfile = () => {
    router.push({
      pathname: '/profile'
    })
  }

  return (
    <nav className={navStyles.nav}>
      <ul>
        <Link href={HOME_ROUTE}>
          <li>{currentPath === HOME_ROUTE ? (<AiFillHome />) : (<AiOutlineHome />)}</li>
        </Link>

        <li><AiOutlineSearch /></li>
        <li><BiMoviePlay /></li>
        <li><AiOutlineShopping /></li>
        <li onClick={handleViewProfile}>
          <img
            style={currrentUserProfilePath === currentPath ? { border: '2px solid white' } : null}
            src={state.currentUser && state.currentUser.avatar ? state.currentUser.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'}
            alt='user profile img' />
        </li>
      </ul>
    </nav>
  )
}

export default NavFooter