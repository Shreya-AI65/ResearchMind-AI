import api from "./api";

// ==========================================
// SEARCH REPORTS
// ==========================================

export const searchReports = async (topic) => {
    try {
        console.log("SEARCH TOPIC:", topic);

        const response = await api.get(
            "/api/v1/reports/search",
            {
                params: {
                    query: topic.trim(),
                },
            }
        );

        console.log("SEARCH REPORT STATUS:", response.status);
        console.log("SEARCH REPORT RESPONSE:", response.data);

        return response.data;

    } catch (error) {
        console.error("SEARCH REPORT STATUS:", error.response?.status);
        console.error(
            "SEARCH REPORT VALIDATION:",
            error.response?.data
        );

        throw error;
    }
};