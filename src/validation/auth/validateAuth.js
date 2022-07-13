import authValidationSchema from './schemas/authValidationSchema.js';

export const validateAuth = (user) => authValidationSchema.validate(user);
