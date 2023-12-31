import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData, postData } from "../services/api-service";
import { Button, Container, Message, MessageHeader } from "semantic-ui-react";
import { decodeToken, getToken, getUserId } from "../services/token-service";

import Navbar from "./Navbar";
import LoadingComponent from "./LoadingComponent";
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
  const getSurvey = async () => {
    try {
      const user_id = getUserId(token);
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
    <div>
      <Navbar />

      <Container>
        {loading ? (
          <LoadingComponent />
        ) : (
          <div>
            <h2 style={{ marginTop: 2 + "rem" }}>
              {surveyTitle} anketine verdiğiniz cevaplar:
            </h2>
            <hr />
            {questionAndAnswer.map((item, index) => {
              return (
                <Message info key={index}>
                  <MessageHeader>{item.question_text}</MessageHeader>
                  <p>{item.answer_text}</p>
                </Message>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}

export default ShowAnswers;
