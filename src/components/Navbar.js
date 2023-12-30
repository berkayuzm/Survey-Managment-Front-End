import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Menu } from "semantic-ui-react";
import { Route, useNavigate, Routes, Outlet } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { getToken } from "../services/api-service";
import { decodeToken } from "../services/token-service";
function Navbar() {
  const [userRole, setUserRole] = useState(null);
  const [userId,setUserId]=useState(0)

  const currentPath = window.location.pathname;
  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodeToken) {
        const role = decodedToken.roles;
        setUserRole(role);
      }
    }
  }, []);

  const signOut = useSignOut();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => {
    if(name==="Anasayfa"){
      navigate("/home")
    }
    else if(name==="completedsurveys"){
      navigate("/completed")
    }
    setActiveItem(name);
  };
  const signOutFunc = () => {
    signOut();
    navigate("/");
  };
  const goToAdmin = () => {
    navigate("/admin");
  };
  return (
    <Menu size="large">
      <Container>
        <Menu.Item
          name="Anasayfa"
          active={activeItem === "Anasayfa"}
          
          onClick={handleItemClick}
        />
        {currentPath === "/admin" ? null : (
          <Menu.Item
            name="completedsurveys"
            active={activeItem === "completedsurveys"}

            onClick={handleItemClick}
          />
        )}
        <Menu.Item position="right">

          {
            currentPath==="/admin"?(null):(
              <>
              {userRole === "admin" ? (
                  <Button style={{ marginRight: 2 + "rem" }}  positive primary onClick={goToAdmin}>
                    Admin
                  </Button>
              ) : null}
              </>
            )
          }
         
            <Button negative onClick={signOutFunc}>
              Log Out
            </Button>
          </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
