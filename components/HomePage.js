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

const HomePage = ({ refetchUser, user, posts, refetchPosts, fetchMorePosts }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [userPosts, setUserPosts] = useState(posts);
  const router = useRouter();
  const [val] = useState(router.query.fromOtherRoute ? true : false)

  console.log(userPosts)

  const { data: notifications, refetch: refetchAllNotis } = useQuery(GET_NOTIFICATIONS_FOR_USER,
    {
      variables: { userId: currentUser.id },
    })


  useEffect(() => {
    if (val) {
      refetchPosts();
      refetchUser();
      refetchAllNotis();
    }
  }, [val])

  const [getAuthedUser] = useLazyQuery(GET_AUTHED_USER);

  // const resetUser = async () => {
  //   // console.log('iran');
  //   const { data } = await getAuthedUser();
  //   if (data && data.getAuthedUser) {
  //     setCurrentUser(data.getAuthedUser)
  //   }
  // }




  // useEffect(() => {
  //   refetchPosts();
  // }, [])


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

          {userPosts && userPosts.map((post, i) => (
            <React.Fragment key={post.id}>
              <Post
                post={post}
                postFromUser={post.postedBy}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                // resetUser={resetUser}
                setPosts={setUserPosts}
                posts={userPosts}
                fromHome={true}
              />

              {i === userPosts.length - 1 &&
                <Waypoint onEnter={fetchMorePosts} />
              }
            </React.Fragment>
          ))}

        </section>
      </div>
      <NavFooter currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  )
}


export default HomePage