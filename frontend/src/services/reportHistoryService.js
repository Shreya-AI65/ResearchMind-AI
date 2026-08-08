import api from "./api";

// ==========================================
// GET REPORT HISTORY
// ==========================================

export const getReportHistory = async () => {

    const response = await api.get(
        "/api/v1/report/history"
    );

    console.log(
        "Report history API:",
        response.data
    );

    return response.data;
};


// ==========================================
// SEARCH REPORTS
// ==========================================

export const searchReports = async (query) => {

    const response = await api.get(
        "/api/v1/reports/search",
        {
            params: {
                query: query,
            },
        }
    );

    console.log(
        "Search reports API:",
        response.data
    );

    return response.data;
};