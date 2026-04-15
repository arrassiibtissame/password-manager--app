import api from "../api/axios";
export const getPasswords = async () => {
    const res =await api.get("/passwords");
    return res.data;
};
export const addPassword = async (passwordData) => {
    await api.post("/passwords", passwordData);
    return res.data;
};
export const deletePassword = async (id) => {
    await api.delete(`/passwords/${id}`);
    return res.data;
}