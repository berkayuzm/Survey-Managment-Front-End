import React, { useEffect } from "react";
import SurveyForm from "./AddSurveyForm";
import { Container, Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import AdminSurveyList from "./AdminSurveyList";

function Admin() {
  const navigate = useNavigate();
  const goToAddSurvey = () => {
    navigate("/newsurvey");
  };
  return (
    <>
      <Navbar />
      <Container>
        <h2>Anket Yönetim Projesi Admin Paneli</h2>

        <Button
          icon
          labelPosition="left"
          positive
          size="medium"
          onClick={goToAddSurvey}
        >
          <Icon name="list alternate outline" /> Yeni Anket
        </Button>
        <AdminSurveyList/>
      </Container>
    </>
  );
}

export default Admin;
