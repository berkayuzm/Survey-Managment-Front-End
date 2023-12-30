import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Card, Container, Icon, Grid, Image } from "semantic-ui-react";
import { fetchData} from "../services/api-service";
import SurveyItem from "./SurveyItem";
const Home=()=> {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
      getAllSurveys();
  },[]);
  const getAllSurveys = async () => {
    try {
      const result = await fetchData("/api/surveys");
      if(result.data){

        setSurveys(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <Container>
        <Grid columns={4} >
          <Grid.Row >
           {
            surveys.map((survey)=>{
                return <SurveyItem key={survey.survey_id} survey={survey}/>
                
            })
           }
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
