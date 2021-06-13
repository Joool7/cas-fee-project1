import express from 'express';
const router = express.Router();
import * as notesController from '../controller/notesController.js';

router.get("/notes", notesController.getAllNotes);
router.post("/notes", notesController.createNote);
router.get("/notes/:id/", notesController.showNote);
router.delete("/notes/:id/", notesController.deleteNote);

export const noteRoutes = router;
