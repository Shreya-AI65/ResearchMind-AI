import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export async function searchReports(topic) {

    const response = await axios.get(
        `${API_URL}/api/v1/reports/search`,
        {
            params: {
                topic: topic.trim(),
            },
        }
    );

    console.log("SEARCH REPORT API:", response.data);

    return response.data;
}