import mongoose from 'mongoose';

const connectToDatabase = async () => {
  const databaseUrl = process.env.DATABASE_URL || '';
  await mongoose.connect(databaseUrl);
};

export default connectToDatabase;
