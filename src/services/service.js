import axios from 'axios';

const API_URL=import.meta.env.VITE_API_URL
  const token = localStorage.getItem("token"); // or wherever you store it



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
    headers: {
        Authorization: `Bearer ${token}`, // Add token here
     },
  });
  return data

  

}
export const getAllProductByCategoryAPI = async (id) => {
  if(id){
  const { data } = await axios.get(`${API_URL}/product/all?category=${id}`, {
    headers: {
        Authorization: `Bearer ${token}`, // Add token here
     },
  });
  return data

  } 

}

export const addProductAPI = async (productData) => {
    console.log("check,",productData);
    

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

export const deleteProductByIdAPI = async (id) => {
const token=localStorage.getItem("token");
  
  try {
    const { data } = await axios.delete(`${API_URL}/product/delete/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    });
    return data
  } catch (error) {
    console.log("Error fetching product by ID:", error);
    
  }
}

export const editProductAPI = async ({ id, formData }) => {
   console.log(formData);
   
    
  const token = localStorage.getItem("token"); // or wherever you store it

  const { data } = await axios.put(`${API_URL}/product/update/${id}`,formData,{
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
        "Content-Type": "multipart/formdata", // optional if sending JSON
      },
    }
  );  
  alert( data?.message);  
  return data
} 

export const getCartAPI = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/cart/getcart`, {
     headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    });
    return data
  } catch (error) {
    console.log("Error fetching product by ID:", error);
    
  }
}

export const addToCartAPI = async (productData) => {
    console.log("check,",productData);
    

  const { data } = await axios.post(`${API_URL}/cart/addcart`,productData,{
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    }
  );  
        alert( data?.message);  
  return data
}  

export const updateCartQtyAPI = async ({ id, action }) => {
   console.log(action);
   
    
  const token = localStorage.getItem("token"); // or wherever you store it

  const { data } = await axios.put(`${API_URL}/cart/update/${id}`,{
    "action": action
},{
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    }
  );  
  alert( data?.message);  
  return data
} 
export const deleteCartItemAPI = async (id) => {
const token=localStorage.getItem("token");
  
  try {
    const { data } = await axios.delete(`${API_URL}/cart/remove/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    });
    return data
  } catch (error) {
    console.log("Error fetching product by ID:", error);
    
  }
}
 
export const clearCartAPI = async () => {
const token=localStorage.getItem("token");
  
  try {
    const { data } = await axios.delete(`${API_URL}/cart/clear/`, {
        headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    });
    return data
  } catch (error) {
    console.log("Error fetching product by ID:", error);
    
  }
}

export const createOrderAPI = async (productData) => {
    
    

  const { data } = await axios.post(`${API_URL}/payment/createorder`,productData,{
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    }
  );  
   
  return data
}  

export const verifyPaymentAPI = async (productData) => {
    console.log("check,",productData);
    

  const { data } = await axios.post(`${API_URL}/payment/verify`,productData,{
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    }
  );  
        alert( data?.message);  
  return data
} 

export const getMyOrderAPI = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/order/myorder`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    });
    return data
  } catch (error) {
    console.log("Error fetching product by ID:", error);
    
  }
}
export const getAdminOrderListAPI = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/admin/fetchadmin`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    });
    return data
  } catch (error) {
    console.log("Error fetching product by ID:", error);
    
  }
}

export const changeOrderStatusAPI = async ({id ,status}) => {
const token=localStorage.getItem("token");
  
  try {
    const { data } = await axios.put(`${API_URL}/admin/update-status/${id}`,{
    "status": status
},{ 
        headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    });
        alert( data?.message);  

    return data
  } catch (error) {
    console.log("Error fetching product by ID:", error);
    
  }
}
