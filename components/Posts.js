import React, { useState, useEffect } from 'react'
import postStyles from '../styles/home.module.scss';

import Comments from '../components/Comments';
import Likes from '../components/Likes';
import Post from '../components/Post';

import NavFooter from '../components/NavFooter';

const Posts = ({ data, header }) => {
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

  useEffect(() => {
    if (showComments || showLikes) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showComments, showLikes])

  return (
    <React.Fragment>
      {header}
      <div className={postStyles.homeContainer}>
        {activePost ? (
          <Comments showComments={showComments} setShowComments={setShowComments} currentTopPosition={scrollPosition} post={activePost} />
        ) : null}

        {likesForPost ? (
          <Likes showLikes={showLikes} setShowLikes={setShowLikes} currentTopPosition={scrollPosition} likes={likesForPost} />
        ) : null}

        <section className={showComments ? `${postStyles.posts}  ${postStyles.shiftPosts}` : `${postStyles.posts}`}>
          {data.map((post) => (
            <Post key={post.id} post={post} handleViewComments={handleViewComments} handleViewLikes={handleViewLikes} />
          ))}
        </section>
      </div>
      <NavFooter />
    </React.Fragment>
  )
}

export default Posts