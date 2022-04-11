import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import postStyles from '../styles/home.module.scss';

import Comments from '../components/Comments';
import Post from '../components/Post';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSWR('/api/posts', fetcher);

  const [showComments, setShowComments] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleViewcomments = () => setShowComments(true)

  const handleGetCurrentTopOfPage = () => {
    const currentTopDimensions = window.pageYOffset;
    setScrollPosition(currentTopDimensions);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleGetCurrentTopOfPage, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleGetCurrentTopOfPage);
    }
  }, []);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={postStyles.homeContaineer}>
      <Comments showComments={showComments} setShowComments={setShowComments} currentTopPosition={scrollPosition} />
      <section className={postStyles.posts}>
        {data.map((post) => (
          <Post post={post} handleViewcomments={handleViewcomments} />
        ))}
      </section>
    </div>
  )
}

export default Home;