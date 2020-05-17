import React, { useEffect, useState } from 'react';
import { useApolloClient } from 'react-apollo';
import { ApolloClientOffline } from '@wora/apollo-offline/lib/ApolloClientOffline';

const Rehydration = ({ children }) => {
  const client = useApolloClient();
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    client instanceof ApolloClientOffline && client.hydrate().then(() => setRehydrated(true));
  }, [client]);
  return rehydrated ? <>{children}</> : null;
};

export default Rehydration;
