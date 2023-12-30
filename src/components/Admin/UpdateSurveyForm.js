import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../LoadingComponent";
import { fetchData, putData } from "../../services/api-service";
import { toast } from "react-toastify";
function UpdateSurveyForm() {
  const navigate = useNavigate();
  let { survey_id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  useEffect(() => {
    getSurvey();
  }, []);
  useEffect(() => {
    console.log("all questions", questions);
  }, [questions]);

  //Güncellenecek anketi getir..(Anket bilgileri,Ankete ait sorular ve şıklar.)
  const getSurvey = async () => {
    try {
      const surveyResult = await fetchData(`/api/surveys/${survey_id}`);
      setSurveyTitle(surveyResult[0].title);
      setSurveyDescription(surveyResult[0].description);
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

  // Input değerlerini güncellemek için
  const handleQuestionChange = (questionIndex, newText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].text = newText;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, newText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices[choiceIndex].choice_text = newText;
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
      await putData(`/api/surveys/${survey_id}`, {
        title: surveyTitle,
        description: surveyDescription,
      });

      for (let index1 = 0; index1 < questions.length; index1++) {
        const question_id = questions[index1].question_id;
        await putData(`/api/questions/${question_id}`, {
          text: questions[index1].text,
        });

        for (
          let index2 = 0;
          index2 < questions[index1].choices.length;
          index2++
        ) {
          const choice_id = questions[index1].choices[index2].choice_id;
          console.log(questions[index1]);
          console.log(choice_id);
          await putData(`/api/options/${choice_id}`, {
            options_text: questions[index1].choices[index2].choice_text,
          });
        }
      }
      toast.success('Anket başarıyla güncellendi.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      navigate("/admin");
    } catch (error) {
      console.error("İstek hatası:", error);
    } finally {
    }
  };

  return (
    <Container>
      <h2 style={{ marginTop: 2 + "rem" }}>Yeni bir anket oluştur</h2>
      <hr />
      {loading ? (
        <LoadingComponent />
      ) : (
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
          <br />
          {questions.map((question, questionIndex) => (
            <Form.Field key={questionIndex}>
              <label>{questionIndex + 1}.Soru:</label>
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
                    value={choice.choice_text}
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
            </Form.Field>
          ))}

          <Button
            loading={loadingButton}
            disabled={loadingButton}
            type="submit"
            onClick={submitSurvey}
            color="blue"
            floated="right"
          >
            Güncelle
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default UpdateSurveyForm;
