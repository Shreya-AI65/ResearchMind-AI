import api from "./api";

export const searchReports = async (topic) => {

    const response = await api.get(
        `/api/v1/reports/search?topic=${encodeURIComponent(topic)}`
    );

    return response.data;

};