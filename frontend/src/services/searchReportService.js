import api from "./api";

export const searchReports = async (topic) => {
    const response = await api.get("/api/v1/reports/search", {
        params: {
            topic: topic,
        },
    });

    return response.data;
};