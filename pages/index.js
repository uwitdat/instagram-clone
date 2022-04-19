import React, { useEffect } from 'react';
import Router from 'next/router';
import { useAppContext } from '../context';
// import { InMemoryCache } from '@apollo/client';


export default function App() {

  const [state] = useAppContext()

  useEffect(() => {
    if (!state.user) {
      Router.push('/login')
    } else {
      Router.push('/home')
    }
    // const { pathname } = Router
  }, [state]);

  return (
    <div></div>
  )
}

// export async function getStaticProps() {
//   const client = newApolloClient({
//     uri: 'https://rickandmortyapi.com/graphql',
//     cache: new InMemoryCache(),
//   })
// }