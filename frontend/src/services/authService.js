import api from "../api/axios";

const authService = {
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },

  register: async (username, email, password) => {
    const res = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return res.data;
  },
};

export default authService;