import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import postStyles from '../styles/home.module.scss';

import Comments from '../components/Comments';
import Post from '../components/Post';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSWR('/api/posts', fetcher);

  const [showComments, setShowComments] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(null);
  const [activePost, setActivePost] = useState(null)

  const handleViewcomments = (post) => {
    const currentTopDimensions = window.pageYOffset;
    setScrollPosition(currentTopDimensions);
    setActivePost(post)
    setShowComments(true)
  }

  useEffect(() => {
    if (showComments) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showComments])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={postStyles.homeContainer}>
      <Comments showComments={showComments} setShowComments={setShowComments} currentTopPosition={scrollPosition} post={activePost} />
      <section className={showComments ? `${postStyles.posts}  ${postStyles.shiftPosts}` : `${postStyles.posts}`}>
        {data.map((post) => (
          <Post key={post.id} post={post} handleViewcomments={handleViewcomments} />
        ))}
      </section>
    </div>
  )
}

export default Home;