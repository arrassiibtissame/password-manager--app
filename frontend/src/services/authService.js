import api from "../api/axios";
export const loginUser = async (email, password) => {
    const res = await api.post("/auth/login", {email, password});
    return res.data;
};
export const registerUser = async (username, email, password) => {
    const res = await api.post("/auth/register", {username, email, password});
    return res.data;
};