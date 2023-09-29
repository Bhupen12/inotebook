import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //fetch Notes
  const getNotes = async () => {
    const response = await fetch(`${host}api/note/fetchnotes`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjRlMzNjNTM4ZDY2M2U1MjQ2OTMzIn0sImlhdCI6MTY5NDU0MTUwNH0.NqUVOxuxkVWBpCnnDZ0vMjL-YSWFCao5ZGHOdFVFd08",
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // Add Notes
  const addNote = async (title, description, tag) => {
    console.log("Adding Notes");
    //Todo Api Call
    const response = await fetch(`${host}api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjRlMzNjNTM4ZDY2M2U1MjQ2OTMzIn0sImlhdCI6MTY5NDU0MTUwNH0.NqUVOxuxkVWBpCnnDZ0vMjL-YSWFCao5ZGHOdFVFd08",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);
  };

  //Edit node
  const editNote = async (id, title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjRlMzNjNTM4ZDY2M2U1MjQ2OTMzIn0sImlhdCI6MTY5NDU0MTUwNH0.NqUVOxuxkVWBpCnnDZ0vMjL-YSWFCao5ZGHOdFVFd08",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //logic
    for (let index = 0; index < notes.length; ++index) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
  };

  //delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjRlMzNjNTM4ZDY2M2U1MjQ2OTMzIn0sImlhdCI6MTY5NDU0MTUwNH0.NqUVOxuxkVWBpCnnDZ0vMjL-YSWFCao5ZGHOdFVFd08",
      },
    });
    console.log(response);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
