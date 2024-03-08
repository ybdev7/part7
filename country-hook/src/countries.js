import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const ALL = "all";
const NAME = "name";

const getAll = () => {
  const req = axios.get(`${baseUrl}/${ALL}`);
  return req.then((res) => res.data);
};

const get = (name) => {
  const req = axios.get(`${baseUrl}/${NAME}/${name}`);
  return req.then((res) => res.data);
};

export { getAll, get };
