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
        "auth-token": localStorage.getItem("token"),
        Autherization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // Add Notes
  const addNote = async (title, description, tag) => {
    //Todo Api Call
    const response = await fetch(`${host}api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // clint side
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Edit node
  const editNote = async (id, title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    await response.json();

    //logic
    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; ++index) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //delete note
  const deleteNote = async (id) => {
    await fetch(`${host}api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
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
