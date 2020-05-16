import React from 'react';
import { Text, View } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';

import config from './aws-exports';

Amplify.configure(config);
Amplify.Analytics.disable(); // In order to remove Amplify Analytics No Credentials warning

const App = () => {
  return (
    <View>
      <Text>Let&apos;s get started!</Text>
    </View>
  );
};

export default withAuthenticator(App);
