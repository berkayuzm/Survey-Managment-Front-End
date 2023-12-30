import React, { useState } from "react";
import {
  Header,
  Table,
  Button,
  Icon,
  Modal,
  Transition,
} from "semantic-ui-react";

import { useNavigate } from "react-router-dom";
import { deleteData } from "../../services/api-service";
import { toast } from "react-toastify";
function AdminSurveyItem(props) {
  const { survey_id, title, description, created_at } = props.survey;
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const openModal = () => {
    setOpen(true);
  };
  const deleteSurvey = async () => {
    try {
      await deleteData(`/api/surveys/${survey_id}`);
      props.updateList();
      toast.success("Anket başarıyla silindi.", {
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
      console.log(error);
    }
  };
  const updateSurvey = () => {
    navigate(`/updatesurvey/${survey_id}`);
  };
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  };
  return (
    <>
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Header icon>
          <Icon name="trash" />
          Emin misin?
        </Header>
        <Modal.Content>
          <p>
            Bu anketi silmek istediğine emin misin? Bu işlem geri{" "}
            <strong>alınamaz!</strong>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpen(false)}>
            <Icon name="remove" /> Kalsın
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              setOpen(false);
              deleteSurvey();
              setVisible(false)
            }}
          >
            <Icon name="checkmark" /> Evet
          </Button>
        </Modal.Actions>
      </Modal>
         <Transition.Group   animation="fly right" duration={1500}>
        {visible && (
          <Table.Row id="tablo">

            <Table.Cell>
              <Header as="h2" textAlign="center">
                {survey_id}
              </Header>
            </Table.Cell>
            <Table.Cell>{title}</Table.Cell>
            <Table.Cell>{description}</Table.Cell>
            <Table.Cell>{formatDate(created_at)}</Table.Cell>
            <Table.Cell>
              <Button icon="edit" color="blue" onClick={updateSurvey} />
              <Button icon="delete" negative onClick={openModal} />
            </Table.Cell>
          </Table.Row>
          
              )}
              </Transition.Group>
          
    </>
  );
}

export default AdminSurveyItem;
