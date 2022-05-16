import React, { useEffect, useState } from 'react'
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
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GET_AUTHED_USER, GET_ALL_POSTS } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';


const Profile = () => {


  const router = useRouter();
  const [state, setState] = useState(JSON.parse(router.query.currentUser));
  const [userPosts, setUserPosts] = useState(state.posts)

  const [props] = useState(router.query.props && router.query.props !== '' ? JSON.parse(router.query.props) : null);

  const [showPosts, setShowPosts] = useState(props ? props.showPosts : false)
  const [showFollowers, setShowFollowers] = useState(false)
  const [followersEntryPoint, setFollowersEntryPoint] = useState(null)
  const [indexOfClickedPost, setIndexOfClickedPost] = useState(props ? props.idxOfPost : null)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const showPostDetails = (indexOfPost) => {
    setShowPosts(true)
    setIndexOfClickedPost(indexOfPost)
  }

  const handleClosePosts = () => {
    setShowPosts(false)
    getAuthedUser();
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

  const PostsNav = () => {
    return (
      <div className={profilePageStyles.PostsNav}>
        <div onClick={handleClosePosts}>
          <MdOutlineArrowBackIosNew />
        </div>
        <div>
          <p>{state.userName}</p>
          <h3>Posts</h3>
        </div>
      </div>
    )
  }

  const [refetch, setRefetch] = useState(false);
  const [getAllPosts] = useLazyQuery(GET_ALL_POSTS);
  const [getAuthedUser] = useLazyQuery(GET_AUTHED_USER);

  const refetchPosts = async () => {
    setRefetch(true);
    const { data } = await getAllPosts({
      variables: {
        first: 3
      }
    });
    if (data && data.getAllPosts) {
      setUserPosts(data.getAllPosts)
    }
    setRefetch(false);

    const { data: user } = await getAuthedUser();
    if (user && user.getAuthedUser) {
      setState(user.getAuthedUser);
      console.log('IM HERE', user.getAuthedUser)
      setUserPosts(user.getAuthedUser.posts);
    }
  }


  return (
    <React.Fragment>
      {!showPosts ? (<ProfilePageNavHeader currentUser={state} setCurrentUser={setState} refetchPosts={refetchPosts} />) : null}
      <EditProfile setShowEditProfile={setShowEditProfile} currentUser={state} setCurrentUser={setState} showEditProfile={showEditProfile} />

      {state ? (
        <div className={profilePageStyles.profileContainer}>
          <section className={profilePageStyles.profileDetails}>
            <img src={state.avatar ? state.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt={state.avatar} />
            <div>
              <div>
                <h4>{state.posts.length}</h4>
                <p>Posts</p>
              </div>

              <div onClick={() => handleShowFollowers(0)}>
                <h4>{state.followers.length}</h4>
                <p>Followers</p>
              </div>

              <div onClick={() => handleShowFollowers(1)}>
                <h4>{state.following.length}</h4>
                <p>Following</p>
              </div>

            </div>
          </section>


          <FollowersAndFollowing
            currentUser={state}
            setCurrentUser={setState}
            userName={state.userName}
            followers={state.followers}
            following={state.following}
            showFollowers={showFollowers}
            handleHideFollowers={handleHideFollowers}
            entryPoint={followersEntryPoint}
            setFollowersEntryPoint={setFollowersEntryPoint}
            refetchFollowing={''}
          />

          <div className={profilePageStyles.profileAdditionalDetails}>
            <p>{state.bio}</p>
            <button onClick={handleShowEditProfile}>Edit Profile</button>
          </div>

          <div className={profilePageStyles.imageGrid}>
            {state && state.posts || !refetch ? (
              state.posts.map((post, idx) => (
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
          <Posts
            fromHome={false}
            userPosts={userPosts}
            setUserPosts={setUserPosts}
            handleClosePosts={handleClosePosts}
            noLoop={false}
            currentUser={state}
            user={state}
            setCurrentUser={setState}
            header={<PostsNav />}
            indexOfClickedPost={indexOfClickedPost}
            refetchPosts={refetchPosts} />
        ) : null}

      </div>
      {!showPosts ? <NavFooter currentUser={state} setCurrentUser={setState} /> : null}
    </React.Fragment>
  )
}

export const getServerSideProps = requireAuthentication(context => {
  return {
    props: {}
  }
})

export default withRouter(Profile)

