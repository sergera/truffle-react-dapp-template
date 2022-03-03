import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default axios.create({
	baseURL: backendURL
});
