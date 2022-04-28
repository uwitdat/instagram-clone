import React from 'react'
import useSWR from 'swr'
import NavFooter from '../components/NavFooter';
import { requireAuthentication } from '../auth';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../utils/queries';
import Post from '../components/Post';

const Home = () => {

    const { data: postsData, error } = useQuery(GET_ALL_POSTS);

    if (postsData) {
        console.log(postsData)
    }

    return (
        <React.Fragment>
            {postsData && postsData.getAllPosts.map((post) => (
                <Post post={post} user={post.postedBy} />
            ))}
            <NavFooter />
        </React.Fragment>

    )
}

export const getServerSideProps = requireAuthentication(context => {
    return {
        props: {}
    }
})

export default Home;