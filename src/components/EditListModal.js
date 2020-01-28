import React, { useState } from "react";
import { Modal, Button, FormControl } from "react-bootstrap";

export const EditListModal = ({
  closeEditListModal,
  editedList,
  setEditedList,
  lists,
  setLists,
  setEditListModal
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = event => {
    let updateEditedList = editedList;
    updateEditedList.name = event.target.value;
    setEditedList(updateEditedList);
  };

  const saveEditedList = () => {
    if (!editedList.name.length) {
      setErrorMessage("Enter List Name");
      return;
    }

    if (editedList.newList) {
      lists.push(editedList);
    }

    const listsUpdate = lists.map(list => {
      if (editedList.id === list.id) {
        list.name = editedList.name;
      }
      return list;
    });

    setLists(listsUpdate);
    setEditListModal(false);
  };

  return (
    <Modal show={true} onHide={closeEditListModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormControl
          type="text"
          defaultValue={editedList.name}
          placeholder="Add List Name"
          className="mr-sm-2"
          onChange={handleNameChange}
          maxLength="50"
        />

        <sup className="error-class">{errorMessage}</sup>
        <br />

        <Button variant="dark" onClick={saveEditedList}>
          Save
        </Button>
      </Modal.Body>
    </Modal>
  );
};
