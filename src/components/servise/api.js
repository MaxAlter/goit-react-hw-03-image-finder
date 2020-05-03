import axios from "axios";

const KEY = `15346262-2d23a576c3ba87714cfd3e6d1`;
const BASE = `https://pixabay.com/api/`;

export const fetchArticles = (query, page) => {
  const PARAMS = `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return axios.get(BASE + PARAMS);
};
