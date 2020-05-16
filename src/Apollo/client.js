import { ApolloClient } from '@wora/apollo-offline';
import { ApolloCache } from '@wora/apollo-cache';
import { createHttpLink } from 'apollo-link-http';
import { Auth } from 'aws-amplify';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloLink } from 'apollo-link';

import config from '../../aws-exports';

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;
const auth = {
  type: config.aws_appsync_authenticationType,
  jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink(url, createHttpLink({ uri: url })),
]);

const persistOfflineOptions = {
  prefix: 'example-offline-user',
};

const client = new ApolloClient(
  {
    link,
    cache: new ApolloCache({
      // could pass any InMemoryCache options here, such as dataIdFromObject or freezeResults
    }),
    headers: { Authorization: auth.jwtToken },
  },
  persistOfflineOptions,
);

client.setOfflineOptions({
  manualExecution: false, // optional
  start: async (mutations) => mutations,
  onExecute: async (mutation) => mutation,
  onComplete: async () => true,
  onDiscard: async () => true,
  onPublish: async (offlinePayload) => offlinePayload,
});

export default client;
