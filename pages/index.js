import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import HomePage from '../components/HomePage';
import { Spinner } from '../components/Spinner';
import { GET_AUTHED_USER } from '../utils/queries';


export default function App() {
  const { data: currentUser, loading: loadingUser, refetch: refetchUser } = useQuery(GET_AUTHED_USER);

  if (loadingUser) {
    return <Spinner />
  }

  return (
    <div>
      <HomePage
        user={currentUser.getAuthedUser}
        refetchUser={refetchUser}
      />
    </div>
  )
}



