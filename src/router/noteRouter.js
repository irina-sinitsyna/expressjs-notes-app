import { Router } from 'express';
import passport from 'passport';

import API from '../constants/routes.js';
import createNote from '../controllers/notes/createNote.js';
import getAllNotes from '../controllers/notes/getAllNotes.js';
import getNote from '../controllers/notes/getNote.js';
import updateNote from '../controllers/notes/updateNote.js';
import deleteNote from '../controllers/notes/deleteNote.js';

const noteRouter = new Router();

noteRouter.post(API.notes, passport.authenticate('jwt', { session: false }), createNote);
noteRouter.get(API.notes, passport.authenticate('jwt', { session: false }), getAllNotes);
noteRouter.get(API.noteById, passport.authenticate('jwt', { session: false }), getNote);
noteRouter.put(API.noteById, passport.authenticate('jwt', { session: false }), updateNote);
noteRouter.delete(API.noteById, passport.authenticate('jwt', { session: false }), deleteNote);

export default noteRouter;
