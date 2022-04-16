import React, { useState, useRef, useEffect } from 'react'
import postStyles from '../styles/home.module.scss';

import Comments from '../components/Comments';
import Likes from '../components/Likes';
import Post from '../components/Post';

import NavFooter from '../components/NavFooter';

const Posts = ({ data, header, indexOfClickedPost }) => {
  const [showComments, setShowComments] = useState(false)
  const [showLikes, setShowLikes] = useState(false)

  const [scrollPosition, setScrollPosition] = useState(null);
  const [activePost, setActivePost] = useState(null)
  const [likesForPost, setActiveLikesForPost] = useState(null)

  const handleViewComments = (post) => {
    const currentTopDimensions = window.pageYOffset;
    setScrollPosition(currentTopDimensions);
    setActivePost(post)
    setShowComments(true)
  }

  const handleViewLikes = (likes) => {
    const currentTopDimensions = window.pageYOffset;
    setScrollPosition(currentTopDimensions);
    setActiveLikesForPost(likes)
    setShowLikes(true)
  }

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
        {activePost ? (
          <Comments showComments={showComments} setShowComments={setShowComments} currentTopPosition={scrollPosition} post={activePost} />
        ) : null}

        {likesForPost ? (
          <Likes showLikes={showLikes} setShowLikes={setShowLikes} currentTopPosition={scrollPosition} likes={likesForPost} />
        ) : null}

        <section ref={postsRef} className={postStyles.posts}>
          {data.map((post, idx) => (
            <Post key={idx} post={post} handleViewComments={handleViewComments} handleViewLikes={handleViewLikes} />
          ))}
        </section>
      </div>
      <NavFooter />
    </div>
  )
}

export default Posts