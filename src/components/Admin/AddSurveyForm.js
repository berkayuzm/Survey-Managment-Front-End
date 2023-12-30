import React, { useState } from "react";
import { postData } from "../../services/api-service";
import { Button, Checkbox, Container, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
const AddSurveyForm = () => {
  // State'ler
  const navigate=useNavigate();
  const [questions, setQuestions] = useState([{ text: "", choices: [""] }]);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [loadingButton,setLoadingButton]=useState(false);

  // Yeni soru eklemek için
  const addQuestion = () => {
    setQuestions([...questions, { text: "", choices: [""] }]);
  };

  // Yeni şık eklemek için
  const addChoice = (e, questionIndex) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices.push("");
    setQuestions(updatedQuestions);
  };

  // Input değerlerini güncellemek için
  const handleQuestionChange = (questionIndex, newText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].text = newText;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, newText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices[choiceIndex] = newText;
    setQuestions(updatedQuestions);
  };
  const handleTitleCahange = (newText) => {
    setSurveyTitle(newText);
  };
  const handleDescriptionChange = (newText) => {
    setSurveyDescription(newText);
  };

  const submitSurvey = async (e) => {
    e.preventDefault();
    setLoadingButton(true);
    try {
        console.log("deneme")
        const response = await postData("/api/surveys", {
          user_id: 3,
          title: surveyTitle,
          description: surveyDescription,
        });
        const newSurveyId = response.data.id;
        for (let index1 = 0; index1 < questions.length; index1++) {
          const response = await postData("/api/questions", {
            survey_id: newSurveyId,
            text: questions[index1].text,
          });
          const newQuestionId = response.data.id;
          for (
            let index2 = 0;
            index2 < questions[index1].choices.length;
            index2++
          ) {
            const addChoiceResponse = await postData("/api/options", {
              survey_id: newSurveyId,
              question_id: newQuestionId,
              options_text: questions[index1].choices[index2],
            });
            console.log(addChoiceResponse);
          }
        }
        

    } catch (error) {
      console.error("İstek hatası:", error);
    }
    finally{
      navigate("/admin")
      toast.success('Anket başarıyla oluşturuldu.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
   
  };

  return (
    <Container>
    <h2 style={{marginTop:2+"rem"}}>Yeni bir anket oluştur</h2>
    <hr/>
      <Form>
        <Form.Field>
          <label>Title</label>
          <input
            type="text"
            placeholder="Anket başlığı"
            value={surveyTitle}
            onChange={(e) => handleTitleCahange(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Anket açıklaması"
            value={surveyDescription}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
        </Form.Field>
        <hr />
        <br/>
        {questions.map((question, questionIndex) => (
          <Form.Field key={questionIndex}>
            <label>{questionIndex+1}.Soru:</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) =>
                handleQuestionChange(questionIndex, e.target.value)
              }
            />

            {question.choices.map((choice, choiceIndex) => (
              <Form.Field key={choiceIndex}>
                <label>Şık {choiceIndex + 1}:</label>
                <input
                  type="text"
                  value={choice}
                  onChange={(e) =>
                    handleChoiceChange(
                      questionIndex,
                      choiceIndex,
                      e.target.value
                    )
                  }
                />
              
              </Form.Field>
              
            ))}
              <Button color="teal" onClick={(e) => addChoice(e, questionIndex)}>
                  Yeni Sık Ekle
                </Button>
          </Form.Field>
        ))}
        <Button color="blue" onClick={addQuestion}>Yeni Soru Ekle</Button>
        <Button loading={loadingButton} disabled={loadingButton} type="submit" onClick={submitSurvey} positive floated="right">
          Oluştur
        </Button>
      </Form>
    </Container>
  );
};

export default AddSurveyForm;
