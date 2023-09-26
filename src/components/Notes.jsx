import React, { useContext } from "react";
import noteContext from "../context/note/NoteContext";
import NoteItems from "./NoteItems";

const Notes = () => {
  const context = new useContext(noteContext);
  const { notes, setNotes } = context;

  return (
    <div className="row my-3">
      <h1>Your Notes: </h1>
      {notes.map((note) => {
        return <NoteItems note={note} />;
      })}
    </div>
  );
};

export default Notes;
