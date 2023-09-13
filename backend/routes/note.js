const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// Route 1: Get all the notes using: GET "/api/note/fetchallnotes". Login required
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});

// Route 2: Add a new note using: POST "/api/note/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    check("title", "Must be minimum of 3 character").isLength({ min: 3 }),
    check("description", "Must be minimum of 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).send({ error: errors.array() });
      }

      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      console.log(savedNote);
      res.status(200).json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: error.array() });
    }
  }
);

// // Route 3: Update a note using: POST "/api/note/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log("Catch: ", error);
    res.send({ error: error.message });
  }
});
module.exports = router;
