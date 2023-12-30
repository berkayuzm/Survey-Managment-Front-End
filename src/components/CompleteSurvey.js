import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData, postData } from "../services/api-service";
import { Button, Container, Form } from "semantic-ui-react";
import LoadingComponent from "./LoadingComponent";
import { toast } from "react-toastify";
import { getToken } from "../services/api-service";
import { decodeToken } from "../services/token-service";
function CompleteSurvey() {
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();
  const [userId,setUserId]=useState(0)
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [answers,setAnswers]=useState([]);
  const [surveyTitle,setSurveyTitle]=useState("")
  let { survey_id } = useParams();
  useEffect(() => {
    getSurvey();
    const token = getToken();
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodeToken) {
        
        setUserId(decodedToken.user_id)
      }
    }
  }, []);
  useEffect(()=>{
    console.log(userId);

  },[userId])
  const submitForm= async()=>{
    setLoadingButton(true);
      try {
            for (let index = 0; index < answers.length; index++) {
            await postData("/api/answers",answers[index])        
        }
        await postData("/api/completedsurveys",{user_id:userId,survey_id:survey_id})

        navigate("/home")
        toast.success('Anket tamamlandı.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            
        } catch (error) {
            console.log(error)
        }
    }
  const getSurvey = async () => {
    try {
      const surveyResult = await fetchData(`/api/surveys/${survey_id}`);
      setSurveyTitle(surveyResult[0].title);
      const questionResult = await fetchData(
        `/api/surveys/${survey_id}/questions`
      );
      const tempQuestion = [];
      for (
        let questionIndex = 0;
        questionIndex < questionResult.length;
        questionIndex++
      ) {
        const optionsResult = await fetchData(
          `/api/questions/${questionResult[questionIndex].question_id}/options`
        );
        const newQuestion = { question_id: 0, text: "", choices: [] };
        newQuestion.text = questionResult[questionIndex].text;
        newQuestion.question_id = questionResult[questionIndex].question_id;
        if (optionsResult.length > 0) {
          for (let index = 0; index < optionsResult.length; index++) {
            const newChoice = { choice_id: 0, choice_text: "" };
            newChoice.choice_text = optionsResult[index].options_text;
            newChoice.choice_id = optionsResult[index].options_id;
            newQuestion.choices.push(newChoice);
          }
        }
        tempQuestion.push(newQuestion);
      }
      setQuestions(tempQuestion);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRadioChange = (question_id) => (event) => {
    setSelectedValue(event.target.value);
    const newAnswer={user_id:userId,survey_id:survey_id,question_id:question_id,answer_text:event.target.value}
    const hasTargetQuestionId = answers.some((item) => item.question_id === question_id);
    if(!hasTargetQuestionId){
        setAnswers([...answers,newAnswer])
    }
    else{
        const index = answers.findIndex((item) => item.question_id === question_id);
        const tempAnswers=[...answers];
        tempAnswers[index].answer_text=event.target.value
        setAnswers(tempAnswers)
    }
  };
  return (
    <Container>
      <h2 style={{ marginTop: 2 + "rem" }}>{surveyTitle}</h2>
      <hr />
      {loading ? (
        <LoadingComponent />
      ) : (
        <Form>
         
          {questions.map((question, questionIndex) => (
            <Form.Field key={questionIndex}>
              <label>
                {questionIndex + 1}.Soru: {question.text}
              </label>

              {question.choices.map((choice, choiceIndex) => (
                <Form.Field key={choiceIndex}>
                  <Form.Field
                    label={choice.choice_text}
                    control="input"
                    value={choice.choice_text}
                    type="radio"
                    name={question.text}
                    onChange={handleRadioChange(question.question_id)}
                  />
                </Form.Field>
              ))}
            </Form.Field>
          ))}
            <Button
            loading={loadingButton}
            disabled={loadingButton}
            type="submit"
            onClick={submitForm}
            color="blue"
            floated="right"
          >
            Tamamla
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default CompleteSurvey;
