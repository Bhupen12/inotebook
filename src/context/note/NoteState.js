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
    console.log(json);

    setNotes(json);
  };
  // Add Notes
  const addNote = (title, description, tag) => {
    console.log("Adding Notes");
    //Todo Api Call
    const note = {
      _id: "6501feagsr0d3ef250e49630ea1628",
      user: "64ff4e333255c538d663e5246933",
      title: title,
      description: description,
      tag: tag,
      timestamp: "2023-09-13T17:26:43.746Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Edit node
  const editNote = () => {};

  //delete note
  const deleteNote = (id) => {
    console.log(`delete notes id: ${id}`);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
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
