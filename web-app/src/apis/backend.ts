import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const backend = axios.create({
	baseURL: backendURL
});
