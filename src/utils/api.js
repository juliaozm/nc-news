import axios from "axios";

const myApi = axios.create({
  withCredentials: true,
  baseURL: "https://julia-ozmitel-backend-project.onrender.com/api",
});

export const getArticlesList = (topic, sortBy, order, page, limit) => {
  return myApi.get(
    `/articles?${!order || order === null ? "" : `order=${order}&`}${
      !sortBy || sortBy === null ? "" : `sort_by=${sortBy}&`
    }${!topic || topic === "all" || topic === null ? "" : `topic=${topic}&`}${
      !page || page === null ? "" : `page=${page}&`
    }${!limit || limit === null ? "" : `limit=${limit}`}`
  );
};

export const getArticle = (article_id) => {
  return myApi.get(`/articles/${article_id}`);
};

export const getComments = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`);
};

export const updateArticleVotes = (article_id, data, accessToken) => {
  return myApi.patch(`/articles/${article_id}`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const updateCommentVotes = (comment_id, data, accessToken) => {
  return myApi.patch(`/comments/${comment_id}`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const postNewComment = (article_id, comment, accessToken) => {
  return myApi.post(`/articles/${article_id}/comments`, comment, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getTopicsList = () => {
  return myApi.get(`/topics`);
};

export const deleteComment = (comment_id, accessToken) => {
  return myApi.delete(`/comments/${comment_id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const checkUserByEmail = (email) => {
  return myApi.get(`/users/${email}`);
};

export const postNewUser = (newUser) => {
  return myApi.post(`/users`, newUser);
};

export const loginUser = (email, password) => {
  return myApi.post(`/login`, { email, password });
};

export const getRefreshToken = () => {
  return myApi.get(`/refresh_token`);
};

export const deleteRefreshToken = (accessToken) => {
  return myApi.delete(`/refresh_token`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
