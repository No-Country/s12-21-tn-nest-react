import axios from "axios";

export const urlApi = axios.create({
    // baseURL: "https://mentor-w57q.onrender.com/api"
    baseURL: "http://localhost:8080/api"
})
