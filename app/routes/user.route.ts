import { Request, Response, Router } from 'express';
import { yup, validate } from 'libs/validation/yup';

import controller from 'controllers/user.contoller';

import { SignUpParams, SignInParams } from 'types/routes.types';
import { isNotExistValueInDB } from 'libs/validation/custom';
import { isValidUserCredentials } from 'libs/validation/business-custom';
import authenticate from 'middlewares/authenticate';

const router = Router();

router.post(
  '/sign-up',
  validate({
    body: yup.object({
      firstName: yup.string().required().minLength(2).maxLength(60),
      lastName: yup.string().minLength(2).maxLength(60),
      username: yup
        .string()
        .required()
        .maxLength(30)
        .test('unique', 'Value is exists', (value) =>
          isNotExistValueInDB('users', { username: value })
        ),
      password: yup.string().required(),
      age: yup.number(),
      languageCode: yup.string().minLength(2).maxLength(3),
    }),
  }),
  async (req: Request<never, never, SignUpParams, never>, res: Response) => {
    const { firstName, lastName, username, password, age, languageCode } = req.body;

    const data = await controller.signUp({
      firstName,
      lastName,
      username,
      age,
      password,
      languageCode,
    });
    res.send(data);
  }
);

router.post(
  '/sign-in',
  validate({
    body: yup
      .object({
        username: yup.string().required().maxLength(30),
        password: yup.string().required().maxLength(30),
      })
      .test('validCredentials', 'Invalid username or password', (data: any) =>
        isValidUserCredentials(data)
      ),
  }),
  async (req: Request<never, never, SignInParams, never>, res: Response) => {
    const { username, password } = req.body;

    const data = await controller.signIn({ username, password });
    res.send(data);
  }
);

router.get(
  '/self',
  authenticate,
  async (req: Request<never, never, SignInParams, never>, res: Response) => {
    const { username, password } = req.body;
    const user = req.user 
    const data = await controller.selfUser(user);
    res.send(data);
  }
);

export default router;
