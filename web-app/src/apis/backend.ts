import axios from "axios";

import { getBackendURL } from "../env";

const backendURL = getBackendURL();

export const backend = axios.create({
	baseURL: backendURL,
	headers: {'Content-Type': 'application/json'}
});
