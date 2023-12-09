import axios from "axios";

export default function getAllNotes (){
    return axios.get("http://localhost:3001/api/notes")
    .then(response =>{
        const {data} = response
        return data
    })
}   