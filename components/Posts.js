import React, { useRef, useEffect } from 'react'
import postStyles from '../styles/home.module.scss';
import Post from '../components/Post';
import NavFooter from '../components/NavFooter';

const Posts = ({ refetchPosts, userPosts, setUserPosts, user, currentUser, setCurrentUser, header, indexOfClickedPost, noLoop, handleClosePosts }) => {

  const postsRef = useRef(null)

  const scrollToTopOfPost = (postsRef) => {
    const yOffset = -60;
    const coordinatesOfSpecificPost = postsRef.current.children[indexOfClickedPost].getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: coordinatesOfSpecificPost });
  }

  useEffect(() => {
    if (postsRef.current && indexOfClickedPost !== undefined) {
      scrollToTopOfPost(postsRef)
    }
  }, [postsRef])



  return (
    <div>
      {header}
      <div className={postStyles.homeContainer}>
        <section ref={postsRef} className={postStyles.posts}>
          {userPosts && userPosts.map((post, idx) => (
            <Post
              refetchPosts={refetchPosts}
              handleClosePosts={handleClosePosts}
              user={user}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              postFromUser={user}
              key={idx}
              post={post}
              setPosts={setUserPosts}
              posts={userPosts}
            />
          ))}
        </section>
      </div>
      {noLoop ? null : <NavFooter currentUser={currentUser} setCurrentUser={setCurrentUser} />}

    </div>
  )
}

export default Posts