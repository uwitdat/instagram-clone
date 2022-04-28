import { useState, useEffect, useRef } from 'react';
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


export const useElementOnScreen = (options) => {
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)


    const callbackFunction = (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options)
        if (containerRef.current) observer.observe(containerRef.current)

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current)
        }

    }, [containerRef, options])

    return [containerRef, isVisible]

}