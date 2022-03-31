/********
 * Simple function to capture a message from a thrown value
 * whether it is an error, an object, or something else
 * 
 */

import { isObject } from "../validation/dataTypes";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
	if (isObject(error)) return JSON.stringify(error);
  return String(error);
};
