import axios from "./axios";

const API = "http://localhost:8080";

export const loginRequest = (user) => axios.post(`Auth/login`, user);
export const verifyTokenRequest = () => axios.get(`/Auth/login`);
export const addScore = () => {
  axios.post("api/alumn/calificate", id, msg, value);
};
