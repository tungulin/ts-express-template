## TS Express template

Ready backend template in **Express** and **Typescript** to use.

#### Technology Stack: ExpressJS, Typescript, KnexJS, Yup.

Pros of using this template:

1. There is a ready-made authentication solution.
2. Simple project architecture.
3. Working with database via KnexJS. You just need to add database creds.
4. Ability to customize CI/CD in bitbucket via pipelines.
5. Managing and protecting env variables on different environments (dev, stage, production)

This solution is suitable for small projects, both commercial and in-house. Very fast setup and deployment via Bitbucket pipelines and Docker on your server.

For validation, **yup** is used. It is a convenient solution if **yup** is also used on the frontend.

## Start the project

```
 npm install
 npm run start
```

## Description of the project architecture

All your routers are listed in the Routes folder where they are validated.

Example of authorization router with validation of username and password parameters:

```ts
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
```

In routers, the controller is called. Each router has its own controller. The controller contains the business logic

For example, issuing a jwt token, as well as information about the user:

```ts
const signIn = async ({ username, password }: SignUp) => {
  const encPassword = crypto.encryptData(password);
  const userDB = await db('users').where({ username, password: encPassword }).first();

  const _token = jwt.sign(
    { data: { id: userDB.id, username } },
    process.env.JWT_TOKEN_SECRET as string,
    { expiresIn: '24h' }
  );

  return {
    user: userDB,
    _token,
  };
};
```

In the “libraries” folder. You can find different validations, database connection and additional business solutions.

I would like to mention the files libs/validation/custom and libs/validation/business-custom. These are general and business validations respectively.

## Bitbucket CI/CD operation and configuration

The bitbucket-pipelines file is used to configure CI/CD. It is very simple, on your server you configure the docker registry and specify your [registry](https://www.docker.com/blog/how-to-use-your-own-registry-2/) in the bitbucket-pipelines file.

The environment variables are also written there. When building the docker container, these variables will be substituted from the bitbucket variables.

Paste wherever you want yours registry in bitbucket-pipelines:

```yml
# - **registry**
```

Your environment variables will be kept classified in bitbucket.
Enter your variables from the [bitbucket env](https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/) that will be used

```yml
# - echo PORT="${PORT}" >> .env
# - echo DB_CLIENT="${DB_CLIENT}" >> .env
# - echo DB_HOST="${DB_HOST}" >> .env
# - echo DB_PASSWORD="${DB_PASSWORD}" >> .env
# - echo DB_DATABASE="${DB_DATABASE}" >> .env
# - echo DB_USER="${DB_USER}" >> .env
# - echo JWT_TOKEN_SECRET="${JWT_TOKEN_SECRET}" >> .env
```

**Don't forget to uncomment the .env in the .gitignore**

Next, you need to create the stage and production branches. And start bitbucket pipelines. Done! If you have done everything correctly, now your docker images will be sent to your server with different prefixes in the name (stage or production). You can run them and they will use your personal env

Every time you need a new version of a project. You update the version in package.json. And merge it into the production or staging branch. Then the docker image will be knocked down and sent to your server.

My [Github](https://gist.github.com/jbsulli/03df3cdce94ee97937ebda0ffef28287). Glad to collaborate and share experiences!

