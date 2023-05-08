import { RouterContext } from "@koa/router";
import { Next } from "koa";
import httpError from "http-errors";
import { validateJWT } from "../config/jwt";

export const requiredAuthHandler = async (ctx: RouterContext, next: Next) => {
  const header = ctx.request.header.authorization;
  if (!header) {
    throw new httpError.Unauthorized("Please provide a token");
  }
  const token = header.split(" ")[1];
  const tokenPayload = validateJWT(token);
  ctx.state.user_id = tokenPayload.user_id;
  await next();
};
