import { handleUpdateTodo } from '../TestComponent';

const onMutationCompleteHandler = (client, response) => {
  if (response && response.data) {
    switch (Object.keys(response.data).pop()) {
      case 'createTodo': {
        handleUpdateTodo(client, response);
        break;
      }
      default:
    }
  }
};

export default onMutationCompleteHandler;
