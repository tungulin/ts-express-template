// ======= Exmaple controllers =======

export type Validation = {
  name: string;
  age: string;
  isPremiumAccount?: boolean;
};

// ======= User controllers =======

export type SignIn = {
  firstName: string;
  lastName?: string;
  username: string;
  password: string
  age: number;
  languageCode: string;
};

export type SignUp = {
  username: string;
  password: string
};
