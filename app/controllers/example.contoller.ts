import db from 'libs/db';
import { Validation } from 'types/controllers.types';

const helloWorld = () => {
  return {
    Hello: 'world!',
  };
};

const validation = (data: Validation) => {
  return { ...data, message: 'Ok!' };
};

// Explanation:
// Depending on the working environment, you can choose how the function will work
const envSelection = () => {
  const userListFromDB = [{ firstName: 'Andrei', lastName: 'T', age: 22 }];

  return ENV === 'production' ? [] : userListFromDB;
};

const getUserList = async () => {
  const users = await db('users');
  return users;
};

export default { helloWorld, validation, envSelection, getUserList };
