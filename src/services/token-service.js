// services/authService.js

import jwt from 'jsonwebtoken';
console.log("Çalıştı")
export const decodeToken = (token) => {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (error) {
    console.error('Token çözümleme hatası:', error);
    return null;
  }
};

export const getToken=()=>{
  let result = document.cookie.split("; ").reduce((prev, current) => {
      const [name, ...value] = current.split("=");
      prev[name] = value.join("=");
      return prev;
    }, {});
    let accessToken = result._auth;
    return accessToken
}

export const getUserId=(token)=>{
  let user_id;
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodeToken) {
      user_id = decodedToken.user_id;
      return user_id;
    }
    else return null;
  }
}

