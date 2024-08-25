import { Request, Response, NextFunction } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // todo: Here you can add your custom authentication
  // Example: JWT - https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs#step-2-authenticating-a-token
};

export default authenticate;
