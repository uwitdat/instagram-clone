import React, { useState, useEffect } from 'react'
import NavFooter from '../components/NavFooter';
import ProfilePageNavHeader from '../components/ProfilePageNavHeader';
import { withRouter } from 'next/router'
import { currentUser } from './api/api-tests/user';
import profilePageStyles from '../styles/profile-page.module.scss';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import FollowersAndFollowing from '../components/followers-and-following/FollowersAndFollowing';
import { useQuery } from '@apollo/client';
import { GET_POSTS_FROM_USER } from '../utils/queries';
import { getCurrentUser } from '../hooks';
import EditProfile from '../components/EditProfile';

import useSWR from 'swr';
import Posts from '../components/Posts';
import { Spinner } from '../components/Spinner';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Profile = ({ router }) => {
  const userIdFromRouter = parseInt(router.query.user) // use this id to fetch posts
  const { data, error } = useSWR('/api/user', fetcher);
  const [currentUser] = getCurrentUser()

  const { data: postsData, error: postsError } = useQuery(GET_POSTS_FROM_USER, { variables: { userId: userIdFromRouter } })

  const [showPosts, setShowPosts] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)
  const [followersEntryPoint, setFollowersEntryPoint] = useState(null)
  const [indexOfClickedPost, setIndexOfClickedPost] = useState(null)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const showPostDetails = (indexOfPost) => {
    setShowPosts(true)
    setIndexOfClickedPost(indexOfPost)
  }

  const handleShowFollowers = (entryPoint) => {
    setShowFollowers(true)
    setFollowersEntryPoint(entryPoint)
  }

  const handleHideFollowers = () => {
    setShowFollowers(false)
    setFollowersEntryPoint(null)
  }

  const handleShowEditProfile = () => {
    setShowEditProfile(true)
  }

  const handleCloseEditProfile = () => {
    setShowEditProfile(false)
  }

  useEffect(() => {
    window.scrollTo({ top: 0 - 60 }); // make sure page always spawns at very top of page
  })



  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


  const PostsNav = () => {
    return (
      <div className={profilePageStyles.PostsNav}>
        <div onClick={() => setShowPosts(false)}>
          <MdOutlineArrowBackIosNew />
        </div>
        <div>
          <p>{currentUser.currentUser.userName}</p>
          <h3>Posts</h3>
        </div>
      </div>
    )
  }


  return (
    <React.Fragment>
      {!showPosts ? (<ProfilePageNavHeader currentUser={currentUser.currentUser} userIdFromRouter={userIdFromRouter} />) : null}
      <EditProfile currentUser={currentUser.currentUser} showEditProfile={showEditProfile} handleCloseEditProfile={handleCloseEditProfile} />

      {postsData && currentUser.currentUser ? (
        <div className={profilePageStyles.profileContainer}>
          <section className={profilePageStyles.profileDetails}>
            <img src={currentUser.currentUser.avatar ? currentUser.currentUser.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt={data.userAvatar} />
            <div>
              <div>
                <h4>{postsData.postsByUser.length}</h4>
                <p>Posts</p>
              </div>
              <div onClick={() => handleShowFollowers(0)}>
                <h4>1300</h4>
                <p>Followers</p>
              </div>
              <div onClick={() => handleShowFollowers(1)}>
                <h4>240</h4>
                <p>Following</p>
              </div>
            </div>
          </section>

          <FollowersAndFollowing showFollowers={showFollowers} handleHideFollowers={handleHideFollowers} entryPoint={followersEntryPoint} setFollowersEntryPoint={setFollowersEntryPoint} />

          <div className={profilePageStyles.profileAdditionalDetails}>
            <p>{currentUser.currentUser.bio}</p>
            {Number(currentUser.currentUser.id) === userIdFromRouter ? (
              <button onClick={handleShowEditProfile}>Edit Profile</button>
            ) : (
              <div className={profilePageStyles.profileBtnContainer}>
                <button>Message</button>
                <button>Follow</button>
              </div>
            )}
          </div>

          <div className={profilePageStyles.imageGrid}>
            {postsData.postsByUser.map((post, idx) => (
              <div key={idx}>
                <img onClick={() => showPostDetails(idx)} src={post.postContent} alt={post.postContent} />
              </div>
            ))}
            <div /> {/* used as placeholder to stabilize grid due to dynamic content, may not be needed later on or at all */}
          </div>
        </div>
      ) : <Spinner />}



      <div className={profilePageStyles.postsContainer}>
        {showPosts ? <Posts data={data.posts} header={<PostsNav />} indexOfClickedPost={indexOfClickedPost} /> : null}
      </div>
      {!showPosts ? <NavFooter /> : null}

    </React.Fragment>
  )
}

export default withRouter(Profile)