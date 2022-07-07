import { Router } from 'express';

import API from '../constants/routes.js';
import createNote from '../controllers/notes/createNote.js';
import getAllNotes from '../controllers/notes/getAllNotes.js';
import getNote from '../controllers/notes/getNote.js';
import updateNote from '../controllers/notes/updateNote.js';
import deleteNote from '../controllers/notes/deleteNote.js';

const noteRouter = new Router();

noteRouter.post(API.notes, createNote);
noteRouter.get(API.notes, getAllNotes);
noteRouter.get(API.noteById, getNote);
noteRouter.put(API.noteById, updateNote);
noteRouter.delete(API.noteById, deleteNote);

export default noteRouter;
