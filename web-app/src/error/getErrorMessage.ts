import { isObject } from "../validation/dataTypes"

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
	if (isObject(error)) return JSON.stringify(error);
  return String(error);
};
