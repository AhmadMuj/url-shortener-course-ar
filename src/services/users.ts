import httpError from "http-errors";
import knex from "../config/knex";
import { validateLogin, validateRegister } from "./validations";
import { comparePassword, hashPassword } from "../config/encryption";
import { generateToken } from "../config/jwt";

export const getUser = async (username: string) =>
  knex("users").whereRaw(`LOWER(username) = LOWER(?)`, [username]).first();

export const register = async (body: {
  username: string;
  password: string;
}) => {
  validateRegister(body);
  const { username, password } = body;
  const current_user = await getUser(username);
  if (current_user) {
    throw new httpError.Conflict("Username already exists");
  }
  const user = await knex("users").insert(
    {
      username: username.toLowerCase(),
      password: await hashPassword(password),
    },
    ["id", "username"]
  );
  return user[0];
};

export const login = async (body: { username: string; password: string }) => {
  validateLogin(body);
  const { username, password } = body;
  const user = await getUser(username);
  if (!user) {
    throw new httpError.Unauthorized("Username or password are incorrect");
  }
  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new httpError.Unauthorized("Username or password are incorrect");
  }
  const token = await generateToken({ user_id: user.id });
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
};
