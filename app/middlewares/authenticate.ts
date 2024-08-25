import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ type: 'JWTTokenError', message: 'Access denied' });
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN_SECRET as string);
    req.user = decoded.data;
    next();
  } catch (error) {
    return res.status(401).send({
      type: 'JWTTokenError',
      message: 'Invalid token',
    });
  }
};

export default authenticate;
