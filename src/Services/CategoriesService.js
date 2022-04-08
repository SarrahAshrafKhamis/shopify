import axios from "axios";

const URL = "http://localhost:3000/categories";

let CategoriesService = {
  getAll: () => {
    return axios.get(URL);
  },
  getById: (id) => {
    return axios.get(`${URL}/${id}`);
  },
  delete: (id) => {
    return axios.delete(`${URL}/${id}`);
  },
  update: (category) => {
    return axios.put(`${URL}/${category.id}`, { ...category });
  },
  add: (category) => {
    return axios.post(`${URL}`, { ...category });
  },
};

export default CategoriesService;
