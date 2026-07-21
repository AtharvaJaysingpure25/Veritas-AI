import API from "./api";

export const verifyText = async (text) => {
  const response = await API.post("/text-input", { text });
  return response.data;
};

export const verifyFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await API.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};