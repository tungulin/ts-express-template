import { Request, Response, Router } from 'express';
import { yup, validate } from 'libs/validation/yup';

import authenticate from 'middlewares/authenticate';
import controller from 'controllers/user.contoller';
import limiter from 'middlewares/limiter';

import { SignUpParams } from 'types/routes';

const router = Router();

router.post('/sign-up', async (req: Request<never, never, never, never>, res: Response) => {
  // const userDB = await controller.initUser(req.initTelegramData);
  // res.send(userDB);
});

router.post(
  '/sign-in',
  authenticate,
  async (req: Request<never, never, never, never>, res: Response) => {}
);

export default router;
