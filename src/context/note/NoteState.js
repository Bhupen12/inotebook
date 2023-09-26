import { Context } from "express-validator/src/context";
import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6500adc844625b465b1c6999",
      user: "64ff4e33c538d663e5246933",
      title: "title 2",
      description: "Description 2",
      tag: "tag 2",
      timestamp: "2023-09-12T18:28:24.260Z",
      __v: 0,
    },
    {
      _id: "6501f0d3ef250e49630ea162",
      user: "64ff4e33c538d663e5246933",
      title: "title 3",
      description: "Description 3",
      tag: "tag 2",
      timestamp: "2023-09-13T17:26:43.746Z",
      __v: 0,
    },
    {
      _id: "6500adc844625b465b1c6999",
      user: "64ff4e33c538d663e5246933",
      title: "title 2",
      description: "Description 2",
      tag: "tag 2",
      timestamp: "2023-09-12T18:28:24.260Z",
      __v: 0,
    },
    {
      _id: "6501f0d3ef250e49630ea162",
      user: "64ff4e33c538d663e5246933",
      title: "title 3",
      description: "Description 3",
      tag: "tag 2",
      timestamp: "2023-09-13T17:26:43.746Z",
      __v: 0,
    },
    {
      _id: "6500adc844625b465b1c6999",
      user: "64ff4e33c538d663e5246933",
      title: "title 2",
      description: "Description 2",
      tag: "tag 2",
      timestamp: "2023-09-12T18:28:24.260Z",
      __v: 0,
    },
    {
      _id: "6501f0d3ef250e49630ea162",
      user: "64ff4e33c538d663e5246933",
      title: "title 3",
      description: "Description 3",
      tag: "tag 2",
      timestamp: "2023-09-13T17:26:43.746Z",
      __v: 0,
    },
    {
      _id: "6500adc844625b465b1c6999",
      user: "64ff4e33c538d663e5246933",
      title: "title 2",
      description: "Description 2",
      tag: "tag 2",
      timestamp: "2023-09-12T18:28:24.260Z",
      __v: 0,
    },
    {
      _id: "6501f0d3ef250e49630ea162",
      user: "64ff4e33c538d663e5246933",
      title: "title 3",
      description: "Description 3",
      tag: "tag 2",
      timestamp: "2023-09-13T17:26:43.746Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
