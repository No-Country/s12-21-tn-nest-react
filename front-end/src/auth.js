import axios from "./axios";

export const loginRequest = async (user) =>
  await axios.post(`Auth/login`, user);
export const verifyTokenRequest = async () => await axios.get(`Auth/login`);
export const addScore = async (idScore, value, comment) => {
  await axios.post("alumn/calificate", {
    id: idScore,
    msg: comment,
    calification: Number(value),
  });
};
