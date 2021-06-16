import express from 'express';
import {notesController} from '../controller/notesController.js';

const router = express.Router();

router.get('/notes', notesController.getNotes.bind(notesController));
router.post('/notes', notesController.createNote.bind(notesController));
router.get('/notes/:id/', notesController.showNote.bind(notesController));
router.patch('/notes/:id/', notesController.updateNote.bind(notesController));
router.delete('/notes/:id/', notesController.deleteNote.bind(notesController));

export default router;
