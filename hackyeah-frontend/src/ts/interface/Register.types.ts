export type RegisterFormInputs = RegisterDTO & {
  confirmPassword: string;
};

export type RegisterDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  nickName: string;
  phoneNumber: string;
  birthDate: string;
  organization: string;
};

export type RegisterResponse = {};
