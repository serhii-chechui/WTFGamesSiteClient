import axios from "axios";

// The API base URL can be overridden per environment via REACT_APP_API_URL
// (see .env.example / README.md). Falling back to the current production
// URL keeps `npm start` / `npm run build` working exactly as before for
// anyone who hasn't set up a local .env file.
export const API_BASE_URL = process.env.REACT_APP_API_URL || "https://api.wtfgames.com.ua/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 8000,
});

export default apiClient;
