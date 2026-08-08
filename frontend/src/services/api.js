import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,

    (error) => {
        let message = "Something went wrong.";

        if (error.response) {
            const status = error.response.status;

            const detail =
                error.response.data?.detail ||
                error.response.data?.message;

            if (detail) {
                message = detail;
            } else if (status === 400) {
                message = "Invalid request.";
            } else if (status === 401) {
                message = "Unauthorized request.";
            } else if (status === 403) {
                message =
                    "You do not have permission to perform this action.";
            } else if (status === 404) {
                message =
                    "Requested resource was not found.";
            } else if (status === 422) {
                message =
                    "The request data is invalid.";
            } else if (status >= 500) {
                message =
                    "Server error. Please try again later.";
            }
        } else if (error.request) {
            message =
                "Unable to connect to the backend server.";
        } else {
            message =
                error.message || "Something went wrong.";
        }

        console.error("API Error:", message);

        error.userMessage = message;

        return Promise.reject(error);
    }
);

export default api;