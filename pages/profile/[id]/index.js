import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { AiOutlineBell, AiOutlineEllipsis } from 'react-icons/ai';
import profilePageStyles from '../../../styles/profile-page.module.scss';
import profileHeaderStyles from '../../../styles/profile-header.module.scss';
import FollowersAndFollowing from '../../../components/followers-and-following/FollowersAndFollowing';
import Posts from '../../../components/Posts';
import NavFooter from '../../../components/NavFooter';
import { GET_ALL_USER_FOLLOWERS, GET_ALL_USER_FOLLOWING, GET_AUTHED_USER } from '../../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../../utils/mutations';
import { set } from 'lodash';

const UserProfileById = () => {
  const router = useRouter();
  const postFromUser = JSON.parse(router.query.postFromUser);
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState(null);


  const [userPosts, setUserPosts] = useState(postFromUser.posts)

  const { data: currentUser, refetch: refetchCurrentUser } = useQuery(GET_AUTHED_USER);

  const { data: followersData, refetch: refetchFollowers } = useQuery(GET_ALL_USER_FOLLOWERS, {
    variables: { userId: Number(postFromUser?.id) }
  });

  const { data: followingData, refetch: refetchFollowing } = useQuery(GET_ALL_USER_FOLLOWING, {
    variables: { userId: Number(postFromUser?.id) }
  });


  const handleBack = () => {
    router.push('/')
  }

  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);


  const handleFollowUser = async () => {
    try {
      const { data } = await followUser({
        variables: {
          followedByUserId: Number(currentUser.getAuthedUser.id),
          followingUserId: Number(postFromUser.id)
        }
      })
      if (data) {
        refetchFollowers()
        refetchCurrentUser();
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleUnfollowUser = async () => {
    try {
      const { data } = await unfollowUser({
        variables: {
          userId: Number(currentUser.getAuthedUser.id),
          userIdToUnfollow: Number(postFromUser.id)
        }
      })
      if (data) {
        refetchFollowers()
        refetchCurrentUser();
      }
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    if (followersData && followersData?.getAllUserFollowers) {

      const isIdInArray = (follower) => follower.id === currentUser?.getAuthedUser.id;
      setIsFollowing(followersData?.getAllUserFollowers.some(isIdInArray))

    }
  }, [followersData])

  useEffect(() => {
    if (currentUser && currentUser.getAuthedUser) {
      setUser(currentUser.getAuthedUser);
    }
  }, [currentUser])

  useEffect(() => {
    refetchFollowers();
    refetchFollowing();
  }, [])

  const [showPosts, setShowPosts] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)
  const [followersEntryPoint, setFollowersEntryPoint] = useState(null)
  const [indexOfClickedPost, setIndexOfClickedPost] = useState(null)



  const handleClosePosts = () => {
    setShowPosts(false)
    window.scrollTo({ top: 0 - 60 });
  }

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

  console.log('FROM ID', user)

  const PostsNav = () => {
    return (
      <div className={profilePageStyles.PostsNav}>
        <div onClick={handleClosePosts}>
          <MdOutlineArrowBackIosNew />
        </div>
        <div>
          <p>{postFromUser.userName}</p>
          <h3>Posts</h3>
        </div>
      </div>
    )
  }

  return (
    <div>
      <nav className={profileHeaderStyles.otherUserNav}>
        <div>
          <MdOutlineArrowBackIosNew onClick={handleBack} className={profileHeaderStyles.backArrow} />
        </div>
        <div>
          <h2>{postFromUser.userName}</h2>
        </div>
        <ul>
          <li>
            <AiOutlineBell />
          </li>
          <li>
            <AiOutlineEllipsis />
          </li>
        </ul>
      </nav>

      {postFromUser ? (
        <div className={profilePageStyles.profileContainer}>
          <section className={profilePageStyles.profileDetails}>
            <img src={postFromUser.avatar ? postFromUser.avatar : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'} alt={postFromUser.avatar} />
            <div>
              <div>
                <h4>{postFromUser.posts.length}</h4>
                <p>Posts</p>
              </div>
              <div onClick={() => handleShowFollowers(0)}>

                {followersData && currentUser && currentUser.getAuthedUser ? (
                  <h4>{followersData && followersData.getAllUserFollowers.length}</h4>
                ) : (
                  <h4 style={{ color: 'transparent' }}>...</h4>
                )}


                <p>Followers</p>
              </div>
              <div onClick={() => handleShowFollowers(1)}>
                {followingData && currentUser && currentUser.getAuthedUser ? (
                  <h4>{followingData && followingData.getAllUserFollowing.length}</h4>
                ) : (
                  <h4 style={{ color: 'transparent' }}>...</h4>
                )}

                <p>Following</p>
              </div>
            </div>
          </section>

          {followersData && followingData ? (
            <FollowersAndFollowing
              fromProf={true}
              currentUser={user}
              userName={postFromUser.userName}
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
            <p>{postFromUser.bio}</p>
            <div className={profilePageStyles.profileBtnContainer}>
              <button>Message</button>
              {isFollowing ? (
                <button
                  onClick={handleUnfollowUser}
                  className={profilePageStyles.followingBtn}>Following</button>
              ) : (
                <button onClick={handleFollowUser}>Follow</button>
              )}

            </div>
          </div>


          <div className={profilePageStyles.imageGrid}>
            {postFromUser ? (
              postFromUser.posts.map((post, idx) => (
                <div key={idx}>
                  <img onClick={() => showPostDetails(idx)} src={post.postContent} alt={post.postContent} />
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
            handleClosePosts={handleClosePosts}
            noLoop={false}
            user={postFromUser}
            header={<PostsNav />}
            indexOfClickedPost={indexOfClickedPost}
            currentUser={user}
            setCurrentUser={setUser}
            userPosts={userPosts}
            setUserPosts={setUserPosts}
          />
        ) : null}

      </div>
      {!showPosts ? <NavFooter currentUser={user} setCurrentUser={setUser} /> : null}
    </div>
  )
}

export default UserProfileById;