import createNoteValidationSchema from './schemas/createNoteValidationSchema.js';

export const validateNewNote = (note) => createNoteValidationSchema.validate(note);
