import axios from "axios";

//const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = (baseUrl) => {
  const req = axios.get(`${baseUrl}/`);
  return req.then((res) => res.data);
};

const createNew = (baseUrl, person) => {
  const req = axios.post(baseUrl, person);
  return req.then((res) => res.data);
};

const deleteObj = (baseUrl, id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  console.log("here");
  return req;
};

const update = (baseUrl, id, newPerson) => {
  const req = axios.put(`${baseUrl}/${id}`, newPerson);
  return req.then((res) => res.data);
};

export { getAll, createNew, deleteObj, update };
