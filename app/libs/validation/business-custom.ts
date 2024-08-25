// Explanation:
// Here you can write custom business logic validations.
// These validations is narrowly focused on specific tasks

import db from 'libs/db';
import crypto from 'libs/crypto-aes';

interface IValidUserCredentials {
  username: string;
  password: string;
}

export const isValidUserCredentials = async ({ username, password }: IValidUserCredentials) => {
  let isValid = true;
  const encPassword = crypto.encryptData(password);
  const user = await db('users').where({ username, password: encPassword }).first();

  if (!user) isValid = false;
  return isValid;
};
