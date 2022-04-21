import React from 'react'
import useSWR from 'swr'
import NavHeader from '../components/NavHeader';
import Posts from '../components/Posts';
import { QUERY_ALL_USERS } from '../utils/queries';
import { requireAuthentication } from '../auth';
import Link from 'next/link';
import { getCurrentUser } from '../hooks';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data } = useSWR('/api/posts', fetcher); // replace with posts from server
  // const { data: dataTest, loading, error: errortest } = useQuery(QUERY_ALL_USERS);

  const [currentUser] = getCurrentUser()

  // if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <React.Fragment>
      <Posts data={data} header={<NavHeader />} />
      <Link href='/fileupload'>
        <button>uploadfile</button>
      </Link>

    </React.Fragment>
  )
}

export const getServerSideProps = requireAuthentication(context => {
  return {
    props: {}
  }
})

export default Home;