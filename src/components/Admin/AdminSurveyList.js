import React, { useEffect, useState } from "react";
import { Header, Table, Rating } from "semantic-ui-react";
import AdminSurveyItem from "./AdminSurveyItem";
import { fetchData } from "../../services/api-service";
import LoadingComponent from "../LoadingComponent";
function AdminSurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllSurveys();
  }, []);
  const getAllSurveys = async () => {
    try {
      const result = await fetchData("/api/surveys");
      setSurveys(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Table celled padded>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Created_at</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {surveys.map((survey) => {
              return (
                <AdminSurveyItem
                  key={survey.survey_id}
                  survey={survey}
                  updateList={getAllSurveys}
                />
              );
            })}
          </Table.Body>
        </>
      )}
    </Table>
  );
}

export default AdminSurveyList;
