import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../utils/queries';
import Post from './Post';
import postStyles from '../styles/home.module.scss';
import NavHeader from './NavHeader';
import NavFooter from './NavFooter';
import { Waypoint } from 'react-waypoint';


const HomePage = () => {

  const { data: postsData, fetchMore, networkStatus } = useQuery(GET_ALL_POSTS, {
    variables: { first: 3 },
    notifyOnNetworkStatusChange: true
  });

  const fetchMorePosts = () => { // used for infinite scroll
    fetchMore({
      variables: {
        count: postsData.getAllPosts.length,
        first: 3
      },
      updateQuery: (previousValues, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousValues;
        }
        return {
          ...previousValues,
          getAllPosts: [
            ...previousValues.getAllPosts,
            ...fetchMoreResult.getAllPosts
          ]
        }
      }
    })
  }
  return (

    <div>
      <NavHeader />
      <div className={postStyles.homeContainer}>
        <section className={postStyles.posts}>
          {postsData && postsData.getAllPosts.map((post, i) => (
            <React.Fragment key={post.id}>
              <Post post={post} postFromUser={post.postedBy} />

              {i === postsData.getAllPosts.length - 1 &&
                <Waypoint onEnter={fetchMorePosts} />
              }
            </React.Fragment>
          ))}
          {networkStatus === 3 && <h1>loading more...</h1>}
        </section>

      </div>
      <NavFooter />
    </div>
  )
}


export default HomePage