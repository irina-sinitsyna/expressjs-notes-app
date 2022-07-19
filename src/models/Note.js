import mongoose from 'mongoose';

import { CURRENT_DATE_ISO } from '../constants/config.js';

const Note = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: CURRENT_DATE_ISO },
  updatedAt: { type: Date, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Note', Note);
