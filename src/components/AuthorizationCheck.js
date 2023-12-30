import React, { useEffect, useState } from 'react';
import { getToken } from '../services/api-service';
import { decodeToken } from '../services/token-service';

const AuthorizationCheck = ({ requiredRoles, children }) => {
  const [userRoles, setUserRoles] = useState([]);
  useEffect(() => {
    const token=getToken();
    if(token){
        const decodedToken=decodeToken(token);
        if(decodeToken){
            const roles=decodedToken.roles || [];
            setUserRoles(roles)
        }
    }
  }, []);
  const isAuthorized = requiredRoles.some((role) => userRoles.includes(role));

  return <>{isAuthorized ? children : <p>Yetkisiz Erişim</p>}</>;
};

export default AuthorizationCheck;
