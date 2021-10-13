require('dotenv').config();
const User = require('../../models/user');
const { UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { validateRegister, validateLogin } = require('../../utils/validators');


// func for generating the token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
};

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password } }) {
      password = await bcrypt.hash(password, 10);
      const { valid, errors } = validateRegister(username, email, password);
      if (!valid) {
        throw new UserInputError('Fields cannot be empty',{errors});
      }
      const foundUser = await User.findOne({ username });
      if (foundUser) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLogin(username, password);
      if (!valid) {
        throw new UserInputError('Errors', errors);
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError('Wrong credentials', { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
     
  },
};
