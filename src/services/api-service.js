// ApiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
export const getToken=()=>{
    let result = document.cookie.split("; ").reduce((prev, current) => {
        const [name, ...value] = current.split("=");
        prev[name] = value.join("=");
        return prev;
      }, {});
      let accessToken = result._auth;
      return accessToken
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    "x-access-token":getToken()
  },
});

export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const postData = async (endpoint, data = {}) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const putData = async (endpoint, data = {}) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};


// Diğer HTTP metodları için benzer fonksiyonları ekleyebilirsiniz
