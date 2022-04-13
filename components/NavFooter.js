import React from 'react';
import Link from 'next/link'
import navStyles from '../styles/nav-footer.module.scss';
import { AiOutlineHome, AiFillHome, AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { useRouter } from 'next/router'
import { currentUser } from '../pages/api/api-tests/user';

const NavFooter = () => {
  const router = useRouter()
  const HOME_ROUTE = '/home';

  const currentPath = router.asPath;
  const currrentUserProfilePath = `/profile?user=${currentUser.id}`;

  const handleViewProfile = () => {
    router.push({
      pathname: '/profile',
      query: { user: currentUser.id }
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
            src={'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg'}
            alt='user profile img' />
        </li>
      </ul>
    </nav>
  )
}

export default NavFooter