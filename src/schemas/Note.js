import mongoose from 'mongoose';

const Note = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: false },
});

export default mongoose.model('Note', Note);
