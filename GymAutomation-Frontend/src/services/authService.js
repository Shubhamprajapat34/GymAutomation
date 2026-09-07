import api from "./api";

export const login = async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
};

export const register = async (details) => {
    const response = await api.post("/api/auth/register", details);
    return response.data;
};
