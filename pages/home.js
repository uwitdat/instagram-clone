import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import NavHeader from '../components/NavHeader';
import Posts from '../components/Posts';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_USERS, GET_AUTHED_USER } from '../utils/queries';
import { useAppContext } from '../context';
import { requireAuthentication } from '../auth';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data } = useSWR('/api/posts', fetcher); // replace with posts from server
  // const { data: dataTest, loading, error: errortest } = useQuery(QUERY_ALL_USERS);

  const [isCompleted, setIsCompleted] = useState(false)

  const [state, setState] = useAppContext()
  const { data: authedUserData, error } = useQuery(GET_AUTHED_USER, {
    onCompleted: () => setIsCompleted(true)
  });

  console.log('CURRENT AUTHED USER', state)

  useEffect(() => {
    if (isCompleted) {
      setState({
        ...state,
        currentUser: authedUserData.getAuthedUser,
        isAuthed: true
      });
    }
  }, [isCompleted])


  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <Posts data={data} header={<NavHeader />} />
  )
}

export const getServerSideProps = requireAuthentication(context => {
  return {
    props: {}
  }
})

export default Home;