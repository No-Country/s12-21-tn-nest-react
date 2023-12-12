import axios from "./axios";

const API = "http://localhost:8080/api";

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);
