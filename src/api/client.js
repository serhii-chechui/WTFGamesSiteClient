import axios from "axios";

// CRA embeds this public setting from the selected environment at build time.
export const API_BASE_URL = process.env.REACT_APP_API_URL?.trim();
if (!API_BASE_URL) {
    throw new Error("REACT_APP_API_URL is required. Configure it in the environment before starting or building the site.");
}

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 8000,
});

export default apiClient;
