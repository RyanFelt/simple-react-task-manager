import React from "react";
import { Modal, Button, FormControl } from "react-bootstrap";

export const EditItemModal = ({
  closeEditItemModal,
  editedItem,
  setEditedItem,
  lists,
  setLists,
  setEditItemModal
}) => {
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
        <br />
        <Button variant="dark" onClick={saveEditedItem}>
          Save
        </Button>
      </Modal.Body>
    </Modal>
  );
};
