import React, { useState } from "react";
import { Modal, Button, FormControl } from "react-bootstrap";

export const EditItemModal = ({
  closeEditItemModal,
  editedItem,
  setEditedItem,
  lists,
  setLists,
  setEditItemModal
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = event => {
    let updateEditedItem = editedItem;
    updateEditedItem.item.title = event.target.value;
    setEditedItem(updateEditedItem);
  };

  const handleDescriptionChange = event => {
    let updateEditedItem = editedItem;
    updateEditedItem.item.description = event.target.value;
    setEditedItem(updateEditedItem);
  };

  const saveEditedItem = () => {
    if (!editedItem.item.title.length) {
      setErrorMessage("Enter Item Title");
      return;
    }

    const listsUpdate = lists.map(list => {
      if (editedItem.listId === list.id) {
        list.items[editedItem.item.id] = editedItem.item;
      }
      return list;
    });

    setLists(listsUpdate);
    setEditItemModal(false);
  };

  return (
    <Modal show={true} onHide={closeEditItemModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormControl
          type="text"
          defaultValue={editedItem.item.title}
          placeholder="Add Item Title"
          className="mr-sm-2"
          onChange={handleTitleChange}
          maxLength="50"
        />
        <br />
        <FormControl
          as="textarea"
          rows="2"
          defaultValue={editedItem.item.description}
          placeholder="Add Item Description"
          className="mr-sm-2"
          onChange={handleDescriptionChange}
          maxLength="100"
        />

        <sup className="error-class">{errorMessage}</sup>
        <br />

        <Button variant="dark" onClick={saveEditedItem}>
          Save
        </Button>
      </Modal.Body>
    </Modal>
  );
};
