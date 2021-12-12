import axios from "axios";

const http = axios.create({
    baseURL: "https://simple-school-system.herokuapp.com/api/",
    //baseURL: "http://127.0.0.1:8000/api/"
})

export default http;



