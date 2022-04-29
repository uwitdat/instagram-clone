import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHED_USER } from '../utils/queries';
import { useAppContext } from '../context';

export const getCurrentUser = () => {
    const [isCompleted, setIsCompleted] = useState(false)

    const [state, setState] = useAppContext()

    const { data: authedUserData, refetch } = useQuery(GET_AUTHED_USER, {
        onCompleted: () => setIsCompleted(true)
    });

    useEffect(() => {
        if (isCompleted) {
            setState({
                currentUser: authedUserData?.getAuthedUser,
                isAuthed: true,
                refetchCurrentUser: refetch
            });
        }
    }, [isCompleted]);

    return [state, setState];
}
