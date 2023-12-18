import axios from "./axios";

const API = "http://localhost:8080";

export const loginRequest = (user) => axios.post(`Auth/login`, user);
export const verifyTokenRequest = () => axios.get(`/Auth/login`);
export const addScore = (idScore, value, comment) => {
  console.log({ idScore, value, comment });
  console.log(typeof value);
  axios.post("alumn/calificate", {
    id: idScore,
    msg: comment,
    calification: Number(value),
  });
};
