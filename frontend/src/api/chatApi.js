import API from "./api";

export const createChat = async (chatData) => {
  const response = await API.post("/chat", chatData);
  return response.data;
};

export const getUserChats = async () => {
  const response = await API.get("/chat");
  return response.data;
};

export const getChatDetails = async (chatId) => {
  const response = await API.get(`/chat/details/${chatId}`);
  return response.data;
};

export const deleteChat = async (chatId) => {
  const response = await API.delete(`/chat/${chatId}`);
  return response.data;
};