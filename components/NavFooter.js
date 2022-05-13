import React, { useState } from 'react';
import navStyles from '../styles/nav-footer.module.scss';
import { AiOutlineHome, AiFillHome, AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { useRouter } from 'next/router'
import Search from './search/Search';

const NavFooter = ({ currentUser, setCurrentUser }) => {
  const router = useRouter()
  const HOME_ROUTE = '/';
  const currentPath = router.asPath;
  const currrentUserProfilePath = currentUser?.id ? `/profile` : null;

  const handleViewProfile = () => {
    router.push({
      pathname: '/profile',
      query: { currentUser: JSON.stringify(currentUser) },
    },
      '/profile', // "as" argument
    )
  }

  const handleRouteToHome = () => {
    router.push({

      pathname: '/',
      query: { fromOtherRoute: 'true' },
    },
      '/'
    )
  }

  const [showSearch, setShowSearch] = useState(false);
  const [currentTopPosition, setCurrentTopPositition] = useState(null)

  const handleSearch = () => {
    setShowSearch(true);
    setCurrentTopPositition(window.pageYOffset)
  }

  return (
    <React.Fragment>
      <nav className={navStyles.nav}>
        <ul>

          <li onClick={handleRouteToHome}>{currentPath === HOME_ROUTE ? (<AiFillHome />) : (<AiOutlineHome />)}</li>

          <li><AiOutlineSearch onClick={handleSearch} /></li>
          <li><BiMoviePlay /></li>
          <li><AiOutlineShopping /></li>
          <li onClick={handleViewProfile}>
            <img
              style={currrentUserProfilePath === currentPath ? { border: '2px solid white' } : null}
              src={currentUser?.avatar ? currentUser?.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'}
              alt='user profile img' />
          </li>
        </ul>
      </nav>
      <Search currentUser={currentUser} setCurrentUser={setCurrentUser} showSearch={showSearch} setShowSearch={setShowSearch} currentTopPosition={currentTopPosition} />
    </React.Fragment>
  )
}

export default NavFooter