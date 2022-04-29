import { createContext, useContext, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from '../utils/functions';
import { createUploadLink } from 'apollo-upload-client';

const AppContext = createContext();

export function AppWrapper({ children }) {

  const URI = 'http://localhost:5000/graphql';

  const [state, setState] = useState({
    currentUser: null,
    isAuthed: false,
  });

  const httpLink = createUploadLink({
    uri: URI,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from storage if it exists
    const token = getCookie('JWT');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? token : '',
      }
    }
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
  });


  return (
    <AppContext.Provider value={[state, setState]}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </AppContext.Provider>
  );
}


export function useAppContext() {
  return useContext(AppContext);
}