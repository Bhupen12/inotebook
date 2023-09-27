import React, { useContext } from "react";
import noteContext from "../context/note/NoteContext";
import NoteItems from "./NoteItems";
import AddNote from "./AddNote";

const Notes = () => {
  const context = new useContext(noteContext);
  const { notes } = context;

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h1>Your Notes: </h1>
        {notes.map((note) => {
          return <NoteItems key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
