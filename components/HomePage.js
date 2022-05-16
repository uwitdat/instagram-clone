import React, { useState, useEffect } from 'react';
import Post from './Post';
import postStyles from '../styles/home.module.scss';
import NavHeader from './NavHeader';
import NavFooter from './NavFooter';
import { Waypoint } from 'react-waypoint';
import { useRouter } from 'next/router';
import { GET_ALL_POSTS, GET_AUTHED_USER, GET_NOTIFICATIONS_FOR_USER } from '../utils/queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import { requireAuthentication } from '../auth';
import { Spinner } from '../components/Spinner';


export const getServerSideProps = requireAuthentication(context => {
  return {
    props: {}
  }
})

const HomePage = ({ refetchUser, user, posts, fetchMorePosts }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [userPosts, setUserPosts] = useState(posts);
  const router = useRouter();
  const [val] = useState(router.query.fromOtherRoute ? true : false)

  const { data: notifications, refetch: refetchAllNotis } = useQuery(GET_NOTIFICATIONS_FOR_USER,
    {
      variables: { userId: currentUser.id },
    })



  const [refetch, setRefetch] = useState(false);
  const [getAllPosts] = useLazyQuery(GET_ALL_POSTS);
  const [getAuthedUser] = useLazyQuery(GET_AUTHED_USER);

  const refetchPosts = async () => {
    setRefetch(true);
    const { data } = await getAllPosts({
      variables: {
        first: 3
      }
    });
    if (data && data.getAllPosts) {
      setUserPosts(data.getAllPosts)
    }
    setRefetch(false);

    const { data: user } = await getAuthedUser();
    if (user && user.getAuthedUser) {
      setCurrentUser(user.getAuthedUser);
    }
  }

  useEffect(() => {
    if (val) {
      // refetchPosts();
      // refetchUser();
      refetchAllNotis();
    }
  }, [val])

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

          {refetch ? (<Spinner />) : (
            userPosts.map((post, i) => (
              <React.Fragment key={post.id}>
                <Post
                  post={post}
                  postFromUser={post.postedBy}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setPosts={setUserPosts}
                  posts={userPosts}
                  fromHome={true}
                />

                {i === userPosts.length - 1 &&
                  <Waypoint onEnter={fetchMorePosts} />
                }
              </React.Fragment>
            ))
          )}
        </section>
      </div>
      <NavFooter currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  )
}


export default HomePage