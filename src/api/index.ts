import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data }) => data);

const apiRequest = {
  get: url => baseInstance.get(url),
  delete: url => baseInstance.delete(url),
  post: (url, data) => baseInstance.post(url, data),
};

export default apiRequest;
