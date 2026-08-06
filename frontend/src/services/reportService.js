import api from "./api";

export const generateReport = async (query) => {

    const response = await api.post(
        "/api/v1/report",
        {
            query: query
        }
    );

    return response.data;
};