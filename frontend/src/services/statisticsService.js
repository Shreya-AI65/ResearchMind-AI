import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1";

export async function getStatistics() {

    const response = await axios.get(
        `${API_URL}/reports/statistics`
    );

    console.log(
        "STATISTICS RESPONSE:",
        response.data
    );

    return response.data;
}