import React, { useEffect } from "react";
import { Card, Container, Icon, Grid, Image, Button } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";

function SurveyItem({ survey }) {
  const navigate = useNavigate();
  const { survey_id,title, description, created_at } = survey;
  useEffect(() => {
    console.log(title);
  });
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  };
  const goToComplete=()=>{
    navigate(`/completesurvey/${survey_id}`)
  }
  return (
    <Grid.Column>
      <Card className="survey-card">
        <Card.Content header={title} />
        <Card.Content description={description} />
        <Card.Content extra>
          <Icon floated="left" name="calendar alternate" />
          {formatDate(created_at)}
          <Button floated="right" animated="fade" size='mini' onClick={goToComplete}>
            <Button.Content visible>Tamamla</Button.Content>
            <Button.Content hidden>
            <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}

export default SurveyItem;
