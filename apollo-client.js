import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getCookie } from './utils/functions';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

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

const httpLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client;


