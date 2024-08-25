import db from 'libs/db';
import { SignIn, SignUp } from 'types/controllers.types';
import crypto from 'libs/crypto-aes';
import jwt from 'jsonwebtoken';

const signUp = async ({ firstName, lastName, username, password, age, languageCode }: SignIn) => {
  const encPassword = crypto.encryptData(password);
  await db('users').insert({
    firstName,
    lastName,
    username,
    password: encPassword,
    age,
    languageCode,
  });

  const userDB = await db('users').where({ username }).first();

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

const selfUser = async (user: { id: number; username: string }) => {
  const userDB = await db('users').where({ id: user.id }).first();
  return userDB;
};

export default { signUp, signIn, selfUser };
