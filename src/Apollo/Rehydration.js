import React, { useEffect, useState } from 'react';
import { useApolloClient } from 'react-apollo';

const Rehydration = ({ children }) => {
  const client = useApolloClient();
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    client.hydrate().then(() => setRehydrated(true));
  }, []);
  return rehydrated ? <>{children}</> : null;
};

export default Rehydration;
