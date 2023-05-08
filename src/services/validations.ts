import Validator from "validatorjs";
import httpError from "http-errors";
import { RequestBody } from "../types";

export const validateBody = (
  body: RequestBody,
  validationSchema: Validator.Rules
) => {
  const validation = new Validator(body, validationSchema);
  if (validation.fails()) {
    const errors = validation.errors.all();
    const aggregatedErrors: string[] = [];
    Object.keys(errors).forEach((key) => {
      aggregatedErrors.push(validation.errors.first(key) as string);
    });
    const errorMessage = aggregatedErrors.join(" , ");
    throw new httpError.BadRequest(errorMessage);
  }
  return true;
};

export const validateCreateShortURL = (body: RequestBody) =>
  validateBody(body, {
    id: "string|min:5|max:10|not_in:auth,visits,urls",
    url: "url|required",
  });

export const validateUpdateShortURL = (body: RequestBody) =>
  validateBody(body, { url: "url|required" });

export const validateRegister = (body: RequestBody) =>
  validateBody(body, {
    username: "string|required|min:5|max:10",
    password: "string|required|min:6",
  });

export const validateLogin = (body: RequestBody) =>
  validateBody(body, {
    username: "string|required",
    password: "string|required",
  });
