import { handleUpdateTodo } from '../TestComponent';

const onMutationCompleteHandler = (client, response) => {
  if (response && response.errors) {
    console.log(`ERROR FOR MUTATION: \n${response.errors}`);
     /**
     * ERROR HANDLING
     * could implement update / remove cache entry with
     * 'errorHandler(client, response.errors);'
     *  */
  } else if (response && response.data) {
    switch (Object.keys(response.data).pop()) {
      case 'createTodo': {
        handleUpdateTodo(client, response); // make sure to not add entry twice in handleUpdateTodo
        break;
      }
      default:
    }
  }
};

export default onMutationCompleteHandler;
