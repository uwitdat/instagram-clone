import React, { useEffect, useState } from 'react';
import { FOLLOW_USER, UNFOLLOW_USER, SEARCH_USERS } from '../../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import searchStyles from '../../styles/search.module.scss';
import Overlay from '../Overlay';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { GET_AUTHED_USER } from '../../utils/queries';
import { useLazyQuery } from '@apollo/client';
import Image from 'next/image';



const Search = ({ currentUser, showSearch, setShowSearch, currentTopPosition, setCurrentUser }) => {
  const [inputVal, setInputVal] = useState('');
  const [searchUsers] = useMutation(SEARCH_USERS);
  const [results, setResults] = useState([]);
  const [noResultsMsg, setNoResultsMsg] = useState('');

  const [getAuthedUser] = useLazyQuery(GET_AUTHED_USER);

  const handleSearchUsers = async () => {
    try {
      const { data } = await searchUsers({
        variables: {
          searchVal: inputVal
        }
      });
      if (data) {
        setResults(data.searchUsers);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSearch = (e) => {
    setInputVal(e.target.value);
  }

  useEffect(() => {
    if (inputVal !== '') {
      handleSearchUsers();
    } else {
      setResults([]);
      setNoResultsMsg('');
    }
  }, [inputVal])


  useEffect(() => {
    if (results.length === 0 && inputVal !== '') {
      setNoResultsMsg('No results.');
    } else if (results.length > 0 && inputVal !== '') {
      setNoResultsMsg('');
    }
  }, [results, inputVal])


  const IsResultFollowingUser = ({ user }) => {
    const [followUser] = useMutation(FOLLOW_USER);
    const [unfollowUser] = useMutation(UNFOLLOW_USER);
    const [isFollowing, setIsFollowing] = useState(null);

    const handlefollow = async () => {
      try {
        const { data } = await followUser({
          variables: {
            followedByUserId: Number(currentUser.id),
            followingUserId: Number(user.id)
          }
        });
        if (data) {

          const { data } = await getAuthedUser();
          if (data && data.getAuthedUser) {
            setCurrentUser(data.getAuthedUser)
          }
          setIsFollowing(true);
        }
      } catch (err) {
        console.log(err.message)
      }
    }
    const handleUnfollow = async () => {
      try {
        const { data } = await unfollowUser({
          variables: {
            userId: Number(currentUser.id),
            userIdToUnfollow: Number(user.id)
          }
        });
        if (data) {
          // setCurrentUser({
          //   ...currentUser,
          //   following: currentUser.following.filter((follow) => follow.id !== user.id)
          // })
          const { data } = await getAuthedUser();
          if (data && data.getAuthedUser) {
            setCurrentUser(data.getAuthedUser)
          }
          setIsFollowing(false);
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    useEffect(() => {
      const ids = currentUser.following.map((follow) => follow.id)
      setIsFollowing(ids.includes(user.id))
    }, [])

    return (
      isFollowing ? (
        <button onClick={handleUnfollow} className={searchStyles.btnFollowing}>Following</button>
      ) : (
        <button onClick={handlefollow} className={searchStyles.btnFollow}>Follow</button>
      )
    )
  }

  return (
    <Overlay currentTopPosition={currentTopPosition} height={'100vh'} isShowing={showSearch}>
      <nav className={searchStyles.nav}>
        <MdOutlineArrowBackIosNew onClick={() => setShowSearch(false)} />
        <h2>Search Users</h2>
      </nav>
      <div className={searchStyles.input}>
        <AiOutlineSearch />
        <input placeholder='Search for users' value={inputVal} onChange={handleSearch} />
      </div>

      <div className={searchStyles.results}>
        {results.map((user) => (
          <div key={user.id}>
            <div className={searchStyles.image}>
              <Image
                src={user.avatar ? user.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'}
                height={'100%'}
                width={'100%'}
                priority
              />
            </div>

            <div className={searchStyles.details}>
              <h3>{user.userName}</h3>
              <p>{user.name}</p>
            </div>
            {currentUser.id === user.id ? null : (
              <IsResultFollowingUser user={user} />
            )}
          </div>
        ))}
        <p className={searchStyles.noResults}>{noResultsMsg}</p>
      </div>
    </Overlay>
  )
}

export default Search