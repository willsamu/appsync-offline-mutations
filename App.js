import React from 'react';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';

import config from './aws-exports';
import client, { Rehydration } from './src/Apollo';
import TestComponent from './src/TestComponent';

Amplify.configure(config);
Amplify.Analytics.disable(); // In order to remove Amplify Analytics No Credentials warning

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Rehydration>
        <TestComponent />
      </Rehydration>
    </ApolloProvider>
  );
};

export default withAuthenticator(App);
