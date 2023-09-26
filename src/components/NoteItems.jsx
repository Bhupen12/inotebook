import React from "react";

const NoteItems = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3 my-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">
            {note.description} Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Esse nihil dolorem aut error quas ipsum molestias,
            ratione architecto ipsam impedit eveniet aperiam quidem rerum modi
            magnam. Quos inventore sapiente tempora odit ipsa omnis alias.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;
