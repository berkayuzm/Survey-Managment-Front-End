// services/authService.js

import jwt from 'jsonwebtoken';

export const decodeToken = (token) => {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (error) {
    console.error('Token çözümleme hatası:', error);
    return null;
  }
};

