import React from 'react'
import useSWR from 'swr'
import NavHeader from '../components/NavHeader';
import Posts from '../components/Posts';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSWR('/api/posts', fetcher);


  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <Posts data={data} header={<NavHeader />} />
  )
}

export default Home;