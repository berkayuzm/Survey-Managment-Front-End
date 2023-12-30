import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData, postData } from "../services/api-service";
import { Button, Container, Message, MessageHeader } from "semantic-ui-react";
import { getToken } from "../services/api-service";
import { decodeToken } from "../services/token-service";
function ShowAnswers() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [questionAndAnswer, setQuestionAndAnswer] = useState([]);
  let { survey_id } = useParams();
  const token = getToken();

  useEffect(() => {
    getSurvey();
  }, []);
  useEffect(() => {
    console.log(questionAndAnswer);
  }, [questionAndAnswer]);
  const getSurvey = async () => {
    try {
      let user_id;
      if (token) {
        const decodedToken = decodeToken(token);
        if (decodeToken) {
          user_id = decodedToken.user_id;
        }
      }
      const surveyResult = await fetchData(`/api/surveys/${survey_id}`);
      setSurveyTitle(surveyResult[0].title);
      const questionResult = await fetchData(
        `/api/surveys/${survey_id}/questions`
      );
      const tempState = [];
      for (let index = 0; index < questionResult.length; index++) {
        let question_id = questionResult[index].question_id;
        const answerResult = await fetchData(
          `api/answers/user/${user_id}/survey/${survey_id}/question/${question_id}`
        );
         console.log(questionResult)
         console.log(answerResult)
        const newQuestionAndAnswer = {
          question_text: questionResult[index].text,
          answer_text: answerResult[0].answer_text,
        };
        tempState.push(newQuestionAndAnswer);
      }
      setQuestionAndAnswer(tempState);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      {questionAndAnswer.map((item, index) => {
        return (
          <Message info key={index}>
            <MessageHeader>{item.question_text}</MessageHeader>
            <p>{item.answer_text}</p>
          </Message>
        );
      })}
    </Container>
  );
}

export default ShowAnswers;
