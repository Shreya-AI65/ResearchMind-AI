import api from "./api";

export async function searchReports(topic) {
    const response = await api.get(
        "/api/v1/reports/search",
        {
            params: {
                topic: topic.trim(),
            },
        }
    );

    console.log("Search API:", response.data);

    return response.data;
}