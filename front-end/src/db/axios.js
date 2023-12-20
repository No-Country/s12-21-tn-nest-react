import axios from "axios";

const instance = axios.create({
/*   baseURL: "http://localhost:8080/api",
 */  baseURL: "https://mentor-w57q.onrender.com/api",
  withCredentials: true,
});

export default instance;
