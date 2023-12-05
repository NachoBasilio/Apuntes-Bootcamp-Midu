// hellpers/createNote.js
import axios from 'axios';

const createNote = (noteToAddToState) => {
  return axios.post("https://jsonplaceholder.typicode.com/posts", noteToAddToState)
    .then((response) => {
      const { data } = response;
      return data;
    });
}

export default createNote;
