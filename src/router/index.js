import { Router } from 'express';

import API from '../constants/routes.js';
import createNote from '../controllers/notes/createNote.js';
import getAllNotes from '../controllers/notes/getAllNotes.js';
import getNote from '../controllers/notes/getNote.js';
import updateNote from '../controllers/notes/updateNote.js';
import deleteNote from '../controllers/notes/deleteNote.js';

const router = new Router();

router.post(API.notes, createNote);
router.get(API.notes, getAllNotes);
router.get(API.noteById, getNote);
router.put(API.noteById, updateNote);
router.delete(API.noteById, deleteNote);

export default router;
