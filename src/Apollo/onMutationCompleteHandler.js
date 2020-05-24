import { handleUpdateTodo } from '../TestComponent';

const onMutationCompleteHandler = (client, response) => {
  if (response && response.errors) {
    console.log(`ERROR FOR MUTATION: \n${response.errors}`);
    /**
     * ERROR HANDLING
     * Procceed depending on error-type, for ConditinalCheckFailedExceptions
     * implement something like:
     *
     * updateCacheEntry(response.errors[0]);
     *
     *  */
  } else if (response && response.data) {
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
