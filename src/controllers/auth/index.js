import getAllUsers from './getAllUsers.js';
import loginUser from './loginUser.js';
import refreshAuthorization from './refreshAuthorization.js';
import registerUser from './registerUser.js';

const AuthController = {
  login: loginUser,
  register: registerUser,
  getUsers: getAllUsers,
  refresh: refreshAuthorization,
};

export default AuthController;
