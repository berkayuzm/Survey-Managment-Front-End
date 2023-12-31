import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Container, Grid } from "semantic-ui-react";
import { fetchData } from "../services/api-service";
import { getToken, getUserId } from "../services/token-service";
import CompletedSurveyItem from "./CompletedSurveyItem";
import LoadingComponent from "./LoadingComponent";
function CompletedSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const user_id = getUserId(token);
    setUserId(user_id);
  }, []);
  useEffect(() => {
    if (userId !== 0) {
      getAllSurveys();
    }
  }, [userId]);

  const getAllSurveys = async () => {
    try {
      const result = await fetchData(`/api/completedsurveys/user/${userId}`);
        setSurveys(result);
        setLoading(false);
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
          <Grid columns={4}>
            <Grid.Row>
              {surveys.map((survey) => {
                return (
                  <CompletedSurveyItem key={survey.survey_id} survey={survey} />
                );
              })}
            </Grid.Row>
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default CompletedSurveys;
