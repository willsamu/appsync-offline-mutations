import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';

/* ----------------------------- DocumentNodes ----------------------------- */

export const LIST_TODOS = gql`
  query ListTodos {
    listTodos {
      items {
        id
        name
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      name
    }
  }
`;

/* -------------------------- Cache Update Handler -------------------------- */

export const handleUpdateTodo = (client, mutationData) => {
  if (mutationData && mutationData.data.createTodo) {
    const listTodosData = client.readQuery({ query: LIST_TODOS });
    client.writeQuery({
      query: LIST_TODOS,
      data: {
        listTodos: {
          ...listTodosData.listTodos,
          items: [...listTodosData.listTodos.items, mutationData.data.createTodo],
        },
      },
    });
  }
};

/* -------------------------------- Component ------------------------------- */

const TestComponent = () => {
  const { data, error: queryError } = useQuery(LIST_TODOS, { fetchPolicy: 'cache-and-network' });
  const [createTodoMutation, { error: mutationError }] = useMutation(CREATE_TODO, {
    update: (client, mutationData) => handleUpdateTodo(client, mutationData),
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    (queryError || mutationError) && console.log('E R R O R: ', queryError, mutationError);
  }, [queryError, mutationError]);

  const [todoInput, setTodoInput] = useState('');
  const setInput = (input) => setTodoInput(input);
  const createTodo = () => {
    createTodoMutation({ variables: { input: { id: uuid(), name: todoInput } } });
    setTodoInput('');
  };

  return (
    <View style={styles.container}>
      {data &&
        data.listTodos &&
        data.listTodos.items.map((item) => <Text key={item.id}>{item.name}</Text>)}
      <TextInput onChangeText={setInput} style={styles.inputField} value={todoInput} />
      <Button title="Create Todo" onPress={createTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inputField: { backgroundColor: '#e2e2e2', width: 250, margin: 20, height: 50 },
});

export default TestComponent;
