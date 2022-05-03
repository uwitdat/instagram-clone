import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHED_USER } from '../utils/queries';
import { useAppContext } from '../context';
import HomePage from '../components/HomePage';
import { requireAuthentication } from '../auth';
import axios from 'axios';

export default function App() {

  const [isCompleted, setIsCompleted] = useState(false)

  const [_, setState] = useAppContext()

  const { data: authedUserData } = useQuery(GET_AUTHED_USER, {
    onCompleted: () => setIsCompleted(true)
  });


  useEffect(() => {
    if (isCompleted) {
      setState({
        currentUser: authedUserData?.getAuthedUser,
        isAuthed: true
      });
    }
  }, [isCompleted]);

  return (
    <div>
      <HomePage />
    </div>
  )
}

export const getServerSideProps = requireAuthentication(context => {
  return {
    props: {}
  }
})


