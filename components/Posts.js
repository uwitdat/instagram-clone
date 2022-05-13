import React, { useRef, useEffect, useState } from 'react'
import postStyles from '../styles/home.module.scss';
import Post from '../components/Post';
import NavFooter from '../components/NavFooter';

const Posts = ({ user, currentUser, setCurrentUser, header, indexOfClickedPost, noLoop, handleClosePosts }) => {

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

  console.log(user)
  const [postFromUser, setPostFromUser] = useState(user)

  return (
    <div>
      {header}
      <div className={postStyles.homeContainer}>
        <section ref={postsRef} className={postStyles.posts}>
          {postFromUser && postFromUser.posts.map((post, idx) => (
            <Post handleClosePosts={handleClosePosts} user={user} currentUser={currentUser} setCurrentUser={setCurrentUser} postFromUser={user} key={idx} post={post} />
          ))}
        </section>
      </div>
      {noLoop ? null : <NavFooter currentUser={currentUser} setCurrentUser={setCurrentUser} />}

    </div>
  )
}

export default Posts