import axios from 'axios';

const myApi = axios.create({
  baseURL: 'https://julia-ozmitel-backend-project.onrender.com/api',
});

export const getArticle = (article_id) => {
    return myApi.get(`/articles/${article_id}`)
}