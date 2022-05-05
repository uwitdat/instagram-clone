import React, { useEffect, useState } from 'react';
import { SEARCH_USERS } from '../../utils/mutations';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import searchStyles from '../../styles/search.module.scss';
import Overlay from '../Overlay';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { AiOutlineConsoleSql, AiOutlineSearch } from 'react-icons/ai';


const Search = ({ state, showSearch, setShowSearch, currentTopPosition, setState }) => {
  const [inputVal, setInputVal] = useState('');
  const [searchUsers] = useMutation(SEARCH_USERS);
  const [results, setResults] = useState([]);
  const [noResultsMsg, setNoResultsMsg] = useState('');

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
    const [isFollowing, setIsFollowing] = useState(true);

    const handlefollow = async () => {
      try {
        const { data } = await followUser({
          variables: {
            followedByUserId: Number(state.currentUser.id),
            followingUserId: Number(user.id)
          }
        });
        if (data) {
          setState({
            ...state,
            currentUser: {
              ...state.currentUser,
              following: [user, ...state.currentUser.following]
            }
          })
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
            userId: Number(state.currentUser.id),
            userIdToUnfollow: Number(user.id)
          }
        });
        if (data) {
          setState({
            ...state,
            currentUser: {
              ...state.currentUser,
              following: state.currentUser.following.filter((follow) => follow.id !== user.id)
            }
          })
          setIsFollowing(false);
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    useEffect(() => {
      const ids = state.currentUser.following.map((follow) => follow.id)
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
            <img src={user.avatar} />
            <div className={searchStyles.details}>
              <h3>{user.userName}</h3>
              <p>{user.name}</p>
            </div>
            {state.currentUser.id === user.id ? null : (
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