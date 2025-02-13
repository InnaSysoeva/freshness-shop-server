const errorMessages = {
  create: (entity: string) => `Error creating ${entity}`,
  update: (entity: string) => `Error updating ${entity}`,
  delete: (entity: string) => `Error deleting ${entity}`,
  notFound: (entity: string) => `${entity} not found`,
  emailValidation: () => `User with such email already exists`,
  passwordValidation: () => `Password is invalid`,
  unauthorized: () => `User is unauthorized`,
  refreshToken: () => `Invalid refresh token`,
};

export default errorMessages;
