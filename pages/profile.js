import React, { useState } from 'react'
import NavFooter from '../components/NavFooter';
import ProfilePageNavHeader from '../components/ProfilePageNavHeader';
import { withRouter } from 'next/router'
import profilePageStyles from '../styles/profile-page.module.scss';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import FollowersAndFollowing from '../components/followers-and-following/FollowersAndFollowing';
import EditProfile from '../components/EditProfile';
import { requireAuthentication } from '../auth'
import Posts from '../components/Posts';
import { Spinner } from '../components/Spinner';
import { getCurrentUser } from '../hooks';
import { GET_ALL_USER_FOLLOWERS, GET_ALL_USER_FOLLOWING } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Image from 'next/image';

const Profile = () => {
  const [state, setState] = getCurrentUser();

  const { data: followersData, refetch: refetchFollowers } = useQuery(GET_ALL_USER_FOLLOWERS, {
    variables: { userId: state?.currentUser?.id }
  });

  const { data: followingData, refetch: refetchFollowing } = useQuery(GET_ALL_USER_FOLLOWING, {
    variables: { userId: state?.currentUser?.id }
  });

  const [showPosts, setShowPosts] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)
  const [followersEntryPoint, setFollowersEntryPoint] = useState(null)
  const [indexOfClickedPost, setIndexOfClickedPost] = useState(null)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const showPostDetails = (indexOfPost) => {
    setShowPosts(true)
    setIndexOfClickedPost(indexOfPost)
  }

  const handleClosePosts = () => {
    setShowPosts(false)
    window.scrollTo({ top: 0 - 60 });
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

  const PostsNav = () => {
    return (
      <div className={profilePageStyles.PostsNav}>
        <div onClick={handleClosePosts}>
          <MdOutlineArrowBackIosNew />
        </div>
        <div>
          <p>{state.currentUser.userName}</p>
          <h3>Posts</h3>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      {!showPosts ? (<ProfilePageNavHeader currentUser={state.currentUser} />) : null}
      <EditProfile currentUser={state.currentUser} setCurrentUser={setState} showEditProfile={showEditProfile} handleCloseEditProfile={handleCloseEditProfile} />

      {state.currentUser ? (
        <div className={profilePageStyles.profileContainer}>
          <section className={profilePageStyles.profileDetails}>
            <img src={state.currentUser.avatar ? state.currentUser.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt={state.currentUser.avatar} />
            <div>
              <div>
                <h4>{state.currentUser.posts.length}</h4>
                <p>Posts</p>
              </div>
              <div onClick={() => handleShowFollowers(0)}>
                <h4>{followersData && followersData.getAllUserFollowers.length}</h4>
                <p>Followers</p>
              </div>
              <div onClick={() => handleShowFollowers(1)}>
                <h4>{followingData && followingData.getAllUserFollowing.length}</h4>
                <p>Following</p>
              </div>
            </div>
          </section>

          {followersData && followingData ? (
            <FollowersAndFollowing
              userName={state.currentUser.userName}
              followers={followersData.getAllUserFollowers}
              following={followingData.getAllUserFollowing}
              showFollowers={showFollowers}
              handleHideFollowers={handleHideFollowers}
              entryPoint={followersEntryPoint}
              setFollowersEntryPoint={setFollowersEntryPoint}
              refetchFollowing={refetchFollowing}
            />
          ) : null}

          <div className={profilePageStyles.profileAdditionalDetails}>
            <p>{state.currentUser.bio}</p>

            <button onClick={handleShowEditProfile}>Edit Profile</button>


            {/*   <div className={profilePageStyles.profileBtnContainer}>
                <button>Message</button>
                <button>Follow</button>
                 TODO: grab and move
      </div> */}

          </div>


          <div className={profilePageStyles.imageGrid}>
            {state && state.currentUser && state.currentUser.posts ? (
              state.currentUser.posts.map((post, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <Image
                    onClick={() => showPostDetails(idx)}
                    src={post.postContent}
                    alt={post.postContent}
                    layout={'fill'}
                    objectFit={'cover'}
                  />
                </div>
              )))
              : null}
            <div /> {/* used as placeholder to stabilize grid due to dynamic content, may not be needed later on or at all */}
          </div>
        </div>
      ) : <Spinner />}

      <div className={profilePageStyles.postsContainer}>
        {showPosts ? (
          <Posts handleClosePosts={handleClosePosts} noLoop={false} user={state.currentUser ? state.currentUser : null} header={<PostsNav />} indexOfClickedPost={indexOfClickedPost} />
        ) : null}

      </div>
      {!showPosts ? <NavFooter /> : null}

    </React.Fragment>
  )
}

export const getServerSideProps = requireAuthentication(context => {
  return {
    props: {}
  }
})

export default withRouter(Profile)

