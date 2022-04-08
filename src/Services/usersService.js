import axios from "axios";

const URL = "http://localhost:3000/users";

let UsersService = {
  getAll: () => {
    return axios.get(URL);
  },
  getById: (id) => {
    return axios.get(`${URL}/${id}`);
  },
  delete: (id) => {
    return axios.delete(`${URL}/${id}`);
  },
  update: (user) => {
    return axios.put(`${URL}/${user.id}`, { ...user });
  },
  add: (user) => {
    return axios.post(`${URL}`, { ...user });
  },
};

export default UsersService;
