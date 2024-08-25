import { Request, Response, Router } from 'express';
import { yup, validate } from 'libs/validation/yup';

import controller from 'controllers/example.contoller';
import { ValidationParams } from 'types/routes.types';
import { isExistValueInDB } from 'libs/validation/custom';

const router = Router();

router.get('/hello-world', async (req: Request<never, never, never, never>, res: Response) => {
  const data = controller.helloWorld();
  res.send(data);
});

router.post(
  '/validation',
  validate({
    body: yup.object({
      //prettier-ignore
      name: yup
        .string()
        .required()
        .minLength(2)
        .maxLength(30),
      // Example: You can register custom validations. For example, checking whether a given value is in the database
      // .test('unique', 'Value is not exists', (value) => isExistValueInDB('user', { id: value })),
      age: yup.number().required().max(100),
      isPremiumAccount: yup.boolean().notRequired().default(false),
      //
    }),
  }),
  async (req: Request<never, never, ValidationParams, never>, res: Response) => {
    const { name, age, isPremiumAccount } = req.body;
    const data = controller.validation({ name, age, isPremiumAccount });
    res.send(data);
  }
);

router.get('/env-selection', async (req: Request<never, never, never, never>, res: Response) => {
  const data = controller.envSelection();
  res.send(data);
});

export default router;
