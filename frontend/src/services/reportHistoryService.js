import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export async function getReportHistory() {
    const response = await axios.get(
        `${API_URL}/api/v1/report/history`
    );

    console.log("Report history API:", response.data);

    return response.data;
}