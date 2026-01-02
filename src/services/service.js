import axios from 'axios';

const API_URL=import.meta.env.VITE_API_URL



export const registerUserAPI = async (userData) => {
    const { data } = await axios.post(`${API_URL}/users/register`, userData);
    return data;
};

export const loginUserAPI = async (userData) => {
    const { data } = await axios.post(`${API_URL}/users/login`, userData);
    return data;
};

export const getAllProductAPI = async () => {
  const { data } = await axios.get(`${API_URL}/product/all`, {
    headers: { },
  });
  return data
}

export const addProductAPI = async (productData) => {
    console.log("check,",productData);
    
  const token = localStorage.getItem("token"); // or wherever you store it

  const { data } = await axios.post(`${API_URL}/product/create`,productData,{
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
        "Content-Type": "multipart/formdata", // optional if sending JSON
      },
    }
  );  
        alert( data?.message);  
  return data
}

export const getProductByIdAPI = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/product/${id}`, {
      headers: { },
    });
    return data
  } catch (error) {
    console.log("Error fetching product by ID:", error);
    
  }
}