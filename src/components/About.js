import React, { useContext, useEffect } from "react";
import noteContext from "../context/note/NoteContext";

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h1>About</h1>
      <hr />
      <ul>
        <li>{a.state.name}</li>
        <li>{a.state.class}</li>
      </ul>
    </>
  );
};

export default About;
