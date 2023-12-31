// ApiService.js

import axios from 'axios';
import { getToken } from './token-service';

const BASE_URL = 'http://localhost:3000';


const api = axios.create();
api.interceptors.request.use(request => {
  request.headers['x-access-token'] = getToken();
  request.baseURL=BASE_URL;
  request.headers['Content-Type']="application/json"
  return request;
}, error => {
  // İstek gönderme hatası
  return Promise.reject(error);
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
