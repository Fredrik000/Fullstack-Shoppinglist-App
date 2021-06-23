import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
const HttpError = require('../models/http-error');

const protect = async (req, res, next) => {
  let token;

  // Check if there is a token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Return token, without "bearer"
      token = req.headers.authorization.split(' ')[1];

      // Verify token with secret (must be same secret used to create the token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Return user data from database, except the password - Gives us access to user data inn all the protected routes
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new HttpError('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new HttpError('Not authorized, no token');
  }
};

export { protect };
