import api from "./api";

export const getReportHistory = async () => {
    const response = await api.get("/api/v1/report/history");
    return response.data;
};