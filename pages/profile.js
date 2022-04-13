import React, { useState } from 'react'
import NavFooter from '../components/NavFooter';
import ProfileHeaderForCurrentUser from '../components/ProfileHeaderForCurrentUser';
import ProfileHeaderForOtherUsers from '../components/ProfileHeaderForOtherUsers';
import { withRouter } from 'next/router'
import { currentUser } from './api/api-tests/user';
import profilePageStyles from '../styles/profile-page.module.scss';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import useSWR from 'swr';
import Posts from '../components/Posts';

const fetcher = (url) => fetch(url).then((res) => res.json());

const profile = ({ router }) => {
  const id = parseInt(router.query.user) // use this id to fetch posts
  const { data, error } = useSWR('/api/user', fetcher);

  const [showPosts, setShowPosts] = useState(false)

  const showPostDetails = () => {
    setShowPosts(true)
  }

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
      {!showPosts ? (
        currentUser.id === id ? (
          <ProfileHeaderForCurrentUser userName={data.userName} />
        ) : (
          <ProfileHeaderForOtherUsers />
        )
      ) : null}

      <div className={profilePageStyles.profileContainer}>
        <section className={profilePageStyles.profileDetails}>
          <img src={data.userAvatar} alt={data.userAvatar} />
          <div>
            <div>
              <h4>{data.posts.length}</h4>
              <p>Posts</p>
            </div>
            <div>
              <h4>1300</h4>
              <p>Followers</p>
            </div>
            <div>
              <h4>240</h4>
              <p>Following</p>
            </div>
          </div>
        </section>

        <div className={profilePageStyles.profileAdditionalDetails}>
          <p>{data.bio}</p>
          {currentUser.id === id ? (
            <button>Edit Profile</button>
          ) : (
            <div className={profilePageStyles.profileBtnContainer}>
              <button>Message</button>
              <button>Follow</button>
            </div>
          )}
        </div>

        <div className={profilePageStyles.imageGrid}>
          {data.posts.map((post) => (
            <div key={post.id}>
              <img onClick={showPostDetails} src={post.postContent} alt={post.postContent} />
            </div>
          ))}
          <div /> {/* used as placeholder to stabilize grid due to dynamic content, may not be needed later on */}
        </div>
      </div>

      <div className={profilePageStyles.postsContainer}>
        {showPosts ? <Posts data={data.posts} header={<PostsNav />} /> : null}
      </div>
      {!showPosts ? <NavFooter /> : null}
    </React.Fragment>
  )
}

export default withRouter(profile)