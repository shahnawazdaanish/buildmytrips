import axios from 'axios';
const instanceML = axios.create({
    baseURL: import.meta.env.VITE_ML_URL,
});
export default instanceML
