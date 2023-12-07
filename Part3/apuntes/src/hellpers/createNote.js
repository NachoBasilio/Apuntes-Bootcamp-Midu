// hellpers/createNote.js
import axios from 'axios';

const createNote = (noteToAddToState) => {
  return axios.post("http://localhost:3001/api/notes", noteToAddToState)
    .then((response) => {
      const { data } = response;
      return data;
    });
}

export default createNote;
