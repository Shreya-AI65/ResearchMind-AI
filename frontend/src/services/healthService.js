import api from "./api";

export const checkBackendHealth = async () => {
    const response = await api.get("/api/v1/health");

    return response.data;
};