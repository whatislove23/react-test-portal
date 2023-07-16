import axios from "axios";
const API_LINK = `https://api-sand-tau.vercel.app/api/`;

export async function fetchData(path) {
  const link = `${API_LINK}${path}`;
  try {
    return await axios.get(link);
  } catch (error) {
    throw error;
  }
}

export async function deleteData(path) {
  const link = `${API_LINK}${path}`;
  try {
    return await axios.delete(link);
  } catch (error) {
    throw error;
  }
}
export async function postData(path, data) {
  const link = `${API_LINK}${path}`;
  try {
    return await axios.post(link, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function putData(path) {
  const link = `${API_LINK}${path}`;
  try {
    return await axios.put(link);
  } catch (error) {
    throw error;
  }
}
