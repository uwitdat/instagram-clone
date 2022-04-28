import React, { useRef, useEffect } from 'react'
import postStyles from '../styles/home.module.scss';
import Post from '../components/Post';
import NavFooter from '../components/NavFooter';

const Posts = ({ user, header, indexOfClickedPost, noLoop, handleClosePosts }) => {

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
          {user && user.posts.map((post, idx) => (
            <Post handleClosePosts={handleClosePosts} postFromUser={user} key={idx} post={post} />
          ))}
        </section>
      </div>
      {noLoop ? null : <NavFooter />}

    </div>
  )
}

export default Posts