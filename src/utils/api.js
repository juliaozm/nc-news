import axios from 'axios';

const myApi = axios.create({
  baseURL: 'https://julia-ozmitel-backend-project.onrender.com/api',
});

export const getArticlesList = () => {
    return myApi.get(`/articles`)
}