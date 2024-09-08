import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API_URL;
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
export default axios;