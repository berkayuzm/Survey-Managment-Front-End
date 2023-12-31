import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Container, Grid } from "semantic-ui-react";
import { fetchData } from "../services/api-service";
import SurveyItem from "./SurveyItem";
import LoadingComponent from "./LoadingComponent";
import { getToken, getUserId } from "../services/token-service";

const Home = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSurveys();
  }, []);
  

  const getAllSurveys = async () => {
    try {
      const token = getToken();
      const user_id = getUserId(token);
      if (user_id) {
        const result = await fetchData("/api/surveys");
        const completedSurveys = await fetchData(`/api/completedsurveys/user/${user_id}`);
        const IDs=new Set(completedSurveys.map(completedSurvey=>completedSurvey.survey_id))
        console.log(IDs)
        const filteredSurveys=result.data.filter(survey=>!IDs.has(survey.survey_id))
          setSurveys(filteredSurveys);
          setLoading(false);
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <Container>
        {loading ? (
          <LoadingComponent />
        ) : (
          <Grid >
            <Grid.Row >
              {surveys.length > 0 ? (
                surveys.map((survey) => {
                  return <SurveyItem key={survey.survey_id} survey={survey} />;
                })
              ) : (
                <div>Burası şimdilik boş</div>
              )}
            </Grid.Row>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Home;
