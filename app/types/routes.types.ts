// ======= Example routes =======

export type ValidationParams = {
  name: string;
  age: string;
  isPremiumAccount?: boolean;
};

// ======= User routes =======

export type SignUpParams = {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  age: number;
  languageCode: string;
};

export type SignInParams = {
  username: string;
  password: string;
};
