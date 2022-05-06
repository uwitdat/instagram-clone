import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../utils/queries';
import Post from './Post';
import postStyles from '../styles/home.module.scss';
import NavHeader from './NavHeader';
import NavFooter from './NavFooter';
import { Waypoint } from 'react-waypoint';
import { useAppContext } from '../context';
import { Spinner } from './Spinner';


const HomePage = () => {
  const [state] = useAppContext();

  const { data: postsData, fetchMore, networkStatus } = useQuery(GET_ALL_POSTS, {
    variables: { first: 3 },
    notifyOnNetworkStatusChange: true,
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
      <NavHeader userId={state && state.currentUser ? state.currentUser.id : null} />
      {postsData && postsData.getAllPosts ? (

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

      ) : <Spinner />}
      <NavFooter />
    </div>
  )
}


export default HomePage