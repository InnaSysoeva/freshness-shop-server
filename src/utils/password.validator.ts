import validator from "validator";

const minimumPassswordLength = 8;

export const isPasswordValid = (password: string): boolean => {
  return (
    validator.isLength(password, { min: minimumPassswordLength }) &&
    /[a-z].*[a-z]/.test(password) &&
    /[A-Z].*[A-Z]/.test(password) &&
    /\d.*\d/.test(password) &&
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password,
    )
  );
};
