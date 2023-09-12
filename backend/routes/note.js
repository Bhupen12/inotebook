const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});

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

module.exports = router;
