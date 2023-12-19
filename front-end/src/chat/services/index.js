import instance from "../../db/axios";

export const getMyChats = async (id) => {
  try {
    const response = await instance.get(`/chat/by-user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
