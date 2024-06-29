import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

export default (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      res.status(200).json({ user });
    });
  } else {
    res.status(401).json({ message: 'Authorization header missing' });
  }
};
