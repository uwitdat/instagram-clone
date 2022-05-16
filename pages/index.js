import { useQuery } from '@apollo/client';
import React from 'react';
import HomePage from '../components/HomePage';
import { Spinner } from '../components/Spinner';
import { GET_AUTHED_USER, GET_ALL_POSTS } from '../utils/queries';
import { requireAuthentication } from '../auth';


export const getServerSideProps = requireAuthentication(context => {
  return {
    props: {}
  }
})

export default function App() {
  const { data: currentUser, loading: loadingUser, refetch: refetchUser } = useQuery(GET_AUTHED_USER);

  const { data, fetchMore, loading, refetch: refetchPosts, networkStatus } = useQuery(GET_ALL_POSTS, {
    variables: { first: 3 },
    notifyOnNetworkStatusChange: true,
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

  if (loadingUser) {
    return <Spinner />
  }

  return (
    <div>
      {data && data.getAllPosts ? (
        <HomePage
          user={currentUser.getAuthedUser}
          refetchUser={refetchUser}
          posts={data.getAllPosts}
          refetchPosts={refetchPosts}
          fetchMorePosts={fetchMorePosts}
        />
      ) : <Spinner />}
    </div>
  )
}



