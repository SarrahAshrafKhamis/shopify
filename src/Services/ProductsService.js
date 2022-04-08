import axios from "axios";

const URL = "http://localhost:3000/products";

let ProructsService = {
  getAll: () => {
    return axios.get(URL);
  },
  getById: (id) => {
    return axios.get(`${URL}/${id}`);
  },
  delete: (id) => {
    return axios.delete(`${URL}/${id}`);
  },
  update: (prod) => {
    return axios.put(`${URL}/${prod.id}`, { ...prod });
  },
  add: (prod) => {
    return axios.post(`${URL}`, { ...prod });
  },
};

export default ProructsService;
