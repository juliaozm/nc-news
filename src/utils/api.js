import axios from "axios";

const myApi = axios.create({
  baseURL: "https://julia-ozmitel-backend-project.onrender.com/api",
});

export const getArticlesList = (topic, sortBy, order) => {
  return myApi.get(
    `/articles?order=${order}&sort_by=${sortBy}&${
      topic === "all" ? "" : `topic=${topic}`
    }`
  );
};

export const getArticle = (article_id) => {
  return myApi.get(`/articles/${article_id}`);
};

export const getComments = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`);
};

export const updateArticleVotes = (article_id, data) => {
  return myApi.patch(`/articles/${article_id}`, data);
};

export const postNewComment = (article_id, comment) => {
  return myApi.post(`/articles/${article_id}/comments`, comment);
};

export const fetchTopicsList = () => {
  return myApi.get(`/topics`);
};

export const deleteComment = (comment_id) => {
  return myApi.delete(`/comments/${comment_id}`);
};
