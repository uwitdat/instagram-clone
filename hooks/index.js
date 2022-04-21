import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import { useQuery } from '@apollo/client';
import { GET_AUTHED_USER } from '../utils/queries';

export function getCurrentUser() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [state, setState] = useAppContext()

  const { data: authedUserData } = useQuery(GET_AUTHED_USER, {
    onCompleted: () => setIsCompleted(true)
  });

  useEffect(() => {
    if (isCompleted) {
      setState({
        ...state,
        currentUser: authedUserData.getAuthedUser,
        isAuthed: true
      });
    }
  }, [isCompleted])

  return [state, setState];

}