import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const removeToken = () => {
  token = null;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return res.data;
};

const comment = async (blog, comment) => {
  const config = {
    headers: { Authorization: token },
  };

  console.log("comment=", comment);
  const res = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    { id: blog.id, comment: comment },
    config
  );
  return res.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res;
};
export default {
  setToken,
  removeToken,
  getAll,
  create,
  update,
  deleteBlog,
  comment,
};
