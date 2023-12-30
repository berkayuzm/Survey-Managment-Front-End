import React, { useEffect } from "react";
import { Card, Container, Icon, Grid, Image, Button } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";

function CompletedSurveyItem({ survey }) {
  const navigate = useNavigate();
  const { survey_id, title, description } = survey;
  const goToDetails = () => {
    navigate(`/show-answers/${survey_id}`);
  };
  return (
    <Grid.Column>
      <Card className="survey-card">
        <Card.Content header={title} />
        <Card.Content description={description} />
        <Card.Content extra>
          <Button
            floated="right"
            animated="fade"
            size="mini"
            fluid
            onClick={goToDetails}
          >
            <Button.Content visible>Detay</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}

export default CompletedSurveyItem;
