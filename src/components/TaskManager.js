import React, { useState, useEffect } from "react";
import uuidv4 from "uuid/v4";
import { EditListModal } from "./EditListModal";
import { EditItemModal } from "./EditItemModal";
import { Button } from "react-bootstrap";
import "../App.css";

export const TaskManager = () => {
  const [lists, setLists] = useState([
    {
      id: "e3ed92e8-db3d-4cee-affb-7c31f0209df7",
      name: "To Do",
      items: {
        "962bda75-47ec-4c2e-bc94-fc5abe4842e6": {
          id: "962bda75-47ec-4c2e-bc94-fc5abe4842e6",
          title: "Homework",
          description: "Math"
        }
      }
    },
    {
      id: "4295203c-4a33-456a-b8e4-8ce6ebc551b6",
      name: "In Progress",
      items: {
        "47c8c34b-0bcf-430c-a4be-f85efaa16517": {
          id: "47c8c34b-0bcf-430c-a4be-f85efaa16517",
          title: "Watch Tv",
          description: "The Office"
        }
      }
    },
    {
      id: "fb6c6b95-03c1-4ffc-ad01-d6944455f264",
      name: "Done",
      items: {
        "e9ca0948-26ef-480a-803f-b26974e941cd": {
          id: "e9ca0948-26ef-480a-803f-b26974e941cd",
          title: "Eat a Burrito",
          description: "YUMMMMMMM"
        }
      }
    }
  ]);

  const [editListModal, setEditListModal] = useState(false);

  const [editItemModal, setEditItemModal] = useState(false);

  const [editedList, setEditedList] = useState({});

  useEffect(() => {
    if (editedList.id) setEditListModal(true);
  }, [editedList]);

  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    if (editedItem.listId) setEditItemModal(true);
  }, [editedItem]);

  const createNewList = () => {
    let listsUpdate = JSON.parse(JSON.stringify(lists));

    const newListItem = {
      id: uuidv4(),
      name: "",
      items: []
    };

    listsUpdate.push(newListItem);

    setLists(listsUpdate);
    setEditedList({ ...newListItem });
    setEditListModal(true);
  };

  const createNewItem = ({ listId }) => {
    let newItem = {};

    const listsUpdate = lists.map(list => {
      if (listId === list.id) {
        newItem = {
          id: uuidv4(),
          title: "",
          description: ""
        };

        list.items[newItem.id] = newItem;
      }
      return list;
    });

    setLists(listsUpdate);
    setEditedItem({ listId, item: { ...newItem } });
    setEditItemModal(true);
  };

  const closeEditListModal = () => setEditListModal(false);

  const closeEditItemModal = () => setEditItemModal(false);

  const deleteList = ({ listId }) => {
    const listsUpdate = lists.filter(list => listId !== list.id);
    setLists(listsUpdate);
  };

  const deleteItem = ({ listId, itemId }) => {
    const listsUpdate = lists.map(list => {
      if (listId === list.id) {
        delete list.items[itemId];
      }
      return list;
    });

    setLists(listsUpdate);
  };

  const onDragStart = (event, list, item) => {
    event.dataTransfer.setData("listId", list.id);
    event.dataTransfer.setData("item", JSON.stringify(item));
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const onDrop = (event, newListId) => {
    const listId = event.dataTransfer.getData("listId");
    const item = JSON.parse(event.dataTransfer.getData("item"));

    const listsUpdate = lists.map(list => {
      if (list.id === newListId) {
        list.items[item.id] = item;
      } else if (list.id === listId) {
        delete list.items[item.id];
      }
      return list;
    });

    setLists(listsUpdate);
  };

  return (
    <>
      {editListModal ? (
        <EditListModal
          closeEditListModal={closeEditListModal}
          editedList={editedList}
          setEditedList={setEditedList}
          lists={lists}
          setLists={setLists}
          setEditListModal={setEditListModal}
        />
      ) : null}

      {editItemModal ? (
        <EditItemModal
          closeEditItemModal={closeEditItemModal}
          editedItem={editedItem}
          setEditedItem={setEditedItem}
          lists={lists}
          setLists={setLists}
          setEditItemModal={setEditItemModal}
        />
      ) : null}

      <Button variant="dark margin-top-two" onClick={createNewList}>
        <b>+ List</b>
      </Button>

      <div className="task-manager">
        {lists.map(list => {
          return (
            <div
              className="list-section"
              onDrop={event => {
                onDrop(event, list.id);
              }}
              onDragOver={event => onDragOver(event)}
              key={list.id}
            >
              <div className="edit-del">
                <div
                  className="margin-two div-pointer"
                  onClick={() => setEditedList({ ...list })}
                >
                  <sup>edit</sup>
                </div>

                <div
                  className="margin-two div-pointer"
                  onClick={() => deleteList({ listId: list.id })}
                >
                  <sup>
                    <b>X</b>
                  </sup>
                </div>
              </div>

              <h4 className="margin-top-two">{list.name}</h4>
              {Object.keys(list.items).map(x => (
                <div
                  className="list-item"
                  onDragStart={event => onDragStart(event, list, list.items[x])}
                  key={x}
                  draggable
                >
                  <div className="edit-del">
                    <div
                      className="margin-two div-pointer"
                      onClick={() =>
                        setEditedItem({
                          listId: list.id,
                          item: { ...list.items[x] }
                        })
                      }
                    >
                      <sup>edit</sup>
                    </div>

                    <div
                      className="margin-two div-pointer"
                      onClick={() =>
                        deleteItem({
                          listId: list.id,
                          itemId: x
                        })
                      }
                    >
                      <sup>
                        <b>X</b>
                      </sup>
                    </div>
                  </div>

                  <h5>{list.items[x].title}</h5>
                  <p className="list-item-desc">{list.items[x].description}</p>
                </div>
              ))}
              <Button
                variant="secondary margin-two"
                onClick={() => createNewItem({ listId: list.id })}
              >
                <b>+ Item</b>
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};
