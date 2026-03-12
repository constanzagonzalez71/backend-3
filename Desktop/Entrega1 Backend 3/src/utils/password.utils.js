import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const createHash = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const isValidPassword = async (user, password) => {
  return await bcrypt.compare(password, user.password);
};
