import { Request, Response, Router } from 'express';
import { yup, validate } from 'libs/validation/yup';

import controller from 'controllers/example.contoller';
import { ValidationParams } from 'types/routes.types';

const router = Router();

//Simple route
router.get('/hello-world', async (req: Request<never, never, never, never>, res: Response) => {
  const data = controller.helloWorld();
  res.send(data);
});

//Example validation route
router.post(
  '/validation',
  validate({
    body: yup.object({
      name: yup.string().required().minLength(2).maxLength(30),
      age: yup.number().required().max(100),
      isPremiumAccount: yup.boolean().notRequired().default(false),
    }),
  }),
  async (req: Request<never, never, ValidationParams, never>, res: Response) => {
    const { name, age, isPremiumAccount } = req.body;
    const data = controller.validation({ name, age, isPremiumAccount });
    res.send(data);
  }
);

//Example using env route
router.get('/env-selection', async (req: Request<never, never, never, never>, res: Response) => {
  const data = controller.envSelection();
  res.send(data);
});

export default router;
