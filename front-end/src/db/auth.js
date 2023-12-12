import axios from "axios";

const API = "http://localhost:8080";

export const loginRequest = (user) => axios.post(`${API}/api/Auth/login`, user);
export const verifyTokenRequest = () => axios.get(`/Auth/login`);
