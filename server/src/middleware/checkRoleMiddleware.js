import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (role) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'not authorized' });
      }
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decodedToken.role);
      if (decodedToken.role !== role) {
        return res.status(403).json({ message: 'no access' });
      }
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'not authorized' });
    }
  };
};
