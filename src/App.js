import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { RequireAuth } from "react-auth-kit";
import AuthorizationCheck from "./components/AuthorizationCheck";
import Admin from "./components/Admin/Admin";
import SurveyForm from "./components/Admin/AddSurveyForm";
import AddSurveyForm from "./components/Admin/AddSurveyForm";
import UpdateSurveyForm from "./components/Admin/UpdateSurveyForm";
import CompletedSurveys from "./components/CompletedSurveys";
import CompleteSurvey from "./components/CompleteSurvey";
import ShowAnswers from "./components/ShowAnswers";
function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth loginPath="/">
            <Home />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/completed"
        element={
          <RequireAuth loginPath="/">
            <CompletedSurveys />
          </RequireAuth>
        }
      />
      <Route
        path="/show-answers/:survey_id"
        element={
          <RequireAuth loginPath="/">
            <ShowAnswers />
          </RequireAuth>
        }
      />
      <Route
        path="/completesurvey/:survey_id"
        element={
          <RequireAuth loginPath="/">
            <CompleteSurvey />
          </RequireAuth>
        }
      />

      <Route
        path="/admin"
        element={
          <AuthorizationCheck requiredRoles={["admin"]}>
            <Admin />
          </AuthorizationCheck>
        }
      />

      <Route
        path="/newsurvey"
        element={
          <AuthorizationCheck requiredRoles={["admin"]}>
            <AddSurveyForm />
          </AuthorizationCheck>
        }
      />
      <Route
        path="/updatesurvey/:survey_id"
        element={
          <AuthorizationCheck requiredRoles={["admin"]}>
            <UpdateSurveyForm />
          </AuthorizationCheck>
        }
      />
    </Routes>
  );
}

export default App;
