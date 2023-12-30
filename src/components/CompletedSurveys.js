import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Card, Container, Icon, Grid, Image } from "semantic-ui-react";
import { fetchData } from "../services/api-service";
import { getToken } from "../services/api-service";
import { decodeToken } from "../services/token-service";
import SurveyItem from "./SurveyItem";
import CompletedSurveyItem from "./CompletedSurveyItem";
function CompletedSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [userId,setUserId]=useState(0)

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodeToken) {
        setUserId(decodedToken.user_id);
      }
    }
  }, []); 
  useEffect(()=>{
    if(userId!==0){
        getAllSurveys();

    }
  },[userId])

  const getAllSurveys = async () => {
    try {
      const result = await fetchData(`/api/completedsurveys/user/${userId}`);
      console.log(result)
      if (result.length>0) {
        setSurveys(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <Container>
        <Grid columns={4}>
          <Grid.Row>
            {surveys.map((survey) => {
              return <CompletedSurveyItem key={survey.survey_id} survey={survey} />;
            })}
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default CompletedSurveys;
