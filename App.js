import React from 'react';
import { Text, View } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';

import config from './aws-exports';
import client, { Rehydration } from './src/Apollo';

Amplify.configure(config);
Amplify.Analytics.disable(); // In order to remove Amplify Analytics No Credentials warning

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Rehydration>
        <View>
          <Text>We&apos;re almost done!</Text>
        </View>
      </Rehydration>
    </ApolloProvider>
  );
};

export default withAuthenticator(App);
