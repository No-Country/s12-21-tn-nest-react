import axios from "./axios";

export const loginRequest = (user) => axios.post(`/Auth/login`, user);
export const verifyTokenRequest = () => axios.get(`/Auth/login`);
export const addScore = async (idScore, value, comment) => {
  await axios.post(`/alumn/calificate`, {
    id: idScore,
    msg: comment,
    calification: Number(value),
  });
};
