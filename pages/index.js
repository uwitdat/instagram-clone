import React, { useEffect } from 'react';
import Router from 'next/router';

export default function App() { // TODO: see other ways to create app entry point
  useEffect(() => {
    Router.push('/home')
  }, []);

  return (
    <div></div>
  )
}
