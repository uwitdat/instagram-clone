import React, { useState, useEffect } from 'react';
import Post from './Post';
import postStyles from '../styles/home.module.scss';
import NavHeader from './NavHeader';
import NavFooter from './NavFooter';
import { Waypoint } from 'react-waypoint';
import { useRouter } from 'next/router';
import { GET_NOTIFICATIONS_FOR_USER, GET_ALL_POSTS, GET_AUTHED_USER } from '../utils/queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Spinner } from './Spinner';
import { requireAuthentication } from '../auth';

export const getServerSideProps = requireAuthentication(context => {
  return {
    props: {}
  }
})

const HomePage = ({ refetchUser, user }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const router = useRouter();
  const [val] = useState(router.query.fromOtherRoute ? true : false)

  const { data, fetchMore, loading, refetch: refetchPosts, networkStatus } = useQuery(GET_ALL_POSTS, {
    variables: { first: 3 },
    notifyOnNetworkStatusChange: true,
  })


  const { data: notifications, refetch: refetchAllNotis } = useQuery(GET_NOTIFICATIONS_FOR_USER,
    {
      variables: { userId: currentUser.id },
    })

  const fetchMorePosts = () => { // used for infinite scroll
    fetchMore({
      variables: {
        count: data.getAllPosts.length,
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


  useEffect(() => {
    if (val) {
      // refetchPosts();
      refetchUser();
      refetchAllNotis();
    }
  }, [val])

  const [getAuthedUser] = useLazyQuery(GET_AUTHED_USER);

  const resetUser = async () => {
    console.log('iran');
    const { data } = await getAuthedUser();
    if (data && data.getAuthedUser) {
      setCurrentUser(data.getAuthedUser)
    }
  }


  useEffect(() => {
    refetchPosts();
  }, [])



  return (
    <div>
      <NavHeader
        notifications={notifications}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        refetchPosts={refetchPosts}
        refetchAllNotis={refetchAllNotis}
      />

      <div className={postStyles.homeContainer}>
        <section className={postStyles.posts}>
          {!loading || networkStatus === 3 ? (
            data.getAllPosts.map((post, i) => (
              <React.Fragment key={post.id}>
                <Post
                  post={post}
                  postFromUser={post.postedBy}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  resetUser={resetUser}


                />

                {i === data.getAllPosts.length - 1 &&
                  <Waypoint onEnter={fetchMorePosts} />
                }
              </React.Fragment>
            ))

          ) : (<Spinner />)}

        </section>
      </div>
      <NavFooter currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  )
}


export default HomePage