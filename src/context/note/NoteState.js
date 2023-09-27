import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6500adc844625b465b1c69991",
      user: "64ff4e33c538d663e5246933",
      title: "title 2",
      description: "Description 2",
      tag: "tag 2",
      timestamp: "2023-09-12T18:28:24.260Z",
      __v: 0,
    },
    {
      _id: "6501f0d3ef250e49630ea1622",
      user: "64ff4e33c538d663e5246933",
      title: "title 3",
      description: "Description 3",
      tag: "tag 2",
      timestamp: "2023-09-13T17:26:43.746Z",
      __v: 0,
    },
    {
      _id: "6500adc844625b465b1c69993",
      user: "64ff4e33c538d663e5246933",
      title: "title 2",
      description: "Description 2",
      tag: "tag 2",
      timestamp: "2023-09-12T18:28:24.260Z",
      __v: 0,
    },
    {
      _id: "6501f0d3ef250e49630ea1624",
      user: "64ff4e33c538d663e5246933",
      title: "title 3",
      description: "Description 3",
      tag: "tag 2",
      timestamp: "2023-09-13T17:26:43.746Z",
      __v: 0,
    },
    {
      _id: "6500adc844625b465b1c69995",
      user: "64ff4e33c538d663e5246933",
      title: "title 2",
      description: "Description 2",
      tag: "tag 2",
      timestamp: "2023-09-12T18:28:24.260Z",
      __v: 0,
    },
    {
      _id: "6501f0d3ef250e49630ea1626",
      user: "64ff4e33c538d663e5246933",
      title: "title 3",
      description: "Description 3",
      tag: "tag 2",
      timestamp: "2023-09-13T17:26:43.746Z",
      __v: 0,
    },
    {
      _id: "6500adc844625b465b1c69997",
      user: "64ff4e33c538d663e5246933",
      title: "title 2",
      description: "Description 2",
      tag: "tag 2",
      timestamp: "2023-09-12T18:28:24.260Z",
      __v: 0,
    },
    {
      _id: "6501f0d3ef250e49630ea1628",
      user: "64ff4e33c538d663e5246933",
      title: "title 3",
      description: "Description 3",
      tag: "tag 2",
      timestamp: "2023-09-13T17:26:43.746Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

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
      return note._id != id;
    });
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
