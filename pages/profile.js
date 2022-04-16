import React, { useState, useEffect } from 'react'
import NavFooter from '../components/NavFooter';
import ProfilePageNavHeader from '../components/ProfilePageNavHeader';
import { withRouter } from 'next/router'
import { currentUser } from './api/api-tests/user';
import profilePageStyles from '../styles/profile-page.module.scss';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import FollowersAndFollowing from '../components/followers-and-following/FollowersAndFollowing';

import useSWR from 'swr';
import Posts from '../components/Posts';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Profile = ({ router }) => {
  const userIdFromRouter = parseInt(router.query.user) // use this id to fetch posts
  const { data, error } = useSWR('/api/user', fetcher);

  const [showPosts, setShowPosts] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)
  const [followersEntryPoint, setFollowersEntryPoint] = useState(null)
  const [indexOfClickedPost, setIndexOfClickedPost] = useState(null)

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
          <p>{data.userName}</p>
          <h3>Posts</h3>
        </div>
      </div>
    )
  }


  return (
    <React.Fragment>
      {!showPosts ? (<ProfilePageNavHeader currentUser={data} userIdFromRouter={userIdFromRouter} />) : null}

      <div className={profilePageStyles.profileContainer}>
        <section className={profilePageStyles.profileDetails}>
          <img src={data.userAvatar} alt={data.userAvatar} />
          <div>
            <div>
              <h4>{data.posts.length}</h4>
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
          <p>{data.bio}</p>
          {currentUser.id === userIdFromRouter ? (
            <button>Edit Profile</button>
          ) : (
            <div className={profilePageStyles.profileBtnContainer}>
              <button>Message</button>
              <button>Follow</button>
            </div>
          )}
        </div>

        <div className={profilePageStyles.imageGrid}>
          {data.posts.map((post, idx) => (
            <div key={idx}>
              <img onClick={() => showPostDetails(idx)} src={post.postContent} alt={post.postContent} />
            </div>
          ))}
          <div /> {/* used as placeholder to stabilize grid due to dynamic content, may not be needed later on or at all */}
        </div>
      </div>

      <div className={profilePageStyles.postsContainer}>
        {showPosts ? <Posts data={data.posts} header={<PostsNav />} indexOfClickedPost={indexOfClickedPost} /> : null}
      </div>
      {!showPosts ? <NavFooter /> : null}

    </React.Fragment>
  )
}

export default withRouter(Profile)