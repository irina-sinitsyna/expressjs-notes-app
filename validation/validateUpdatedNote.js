import updateNoteValidationSchema from './schemas/updateNoteValidationSchema.js';

export const validateUpdatedNote = (note) => updateNoteValidationSchema.validate(note);
