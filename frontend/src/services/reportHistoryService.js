import api from "./api";

export async function getReportHistory() {
    const response = await api.get(
        "/api/v1/report/history"
    );

    console.log("Report history API:", response.data);

    return response.data;
}