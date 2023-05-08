import jwt from "jsonwebtoken";
import httpError from "http-errors";
import { RequestBody } from "../types";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

export const generateToken = async (payload: RequestBody) =>
  jwt.sign(payload, JWT_PRIVATE_KEY, { expiresIn: "365d" });

export const validateJWT = (token: string) => {
  try {
    const content = jwt.verify(token, JWT_PRIVATE_KEY) as RequestBody;
    return content;
  } catch (e) {
    throw new httpError.Unauthorized("Please provide a valid token");
  }
};
