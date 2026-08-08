import api from "./api";


// ==========================================
// GENERATE REPORT
// ==========================================

export async function generateReport(reportData) {

    const response = await api.post(
        "/api/v1/report",
        reportData
    );

    return response.data;
}


// ==========================================
// DOWNLOAD PDF
// ==========================================

export async function downloadPDF(reportData) {

    const response = await api.post(
        "/api/v1/report/download",
        reportData,
        {
            responseType: "blob",
        }
    );

    return response;
}


// ==========================================
// DOWNLOAD DOCX
// ==========================================

export async function downloadDOCX(reportData) {

    const response = await api.post(
        "/api/v1/report/download/docx",
        reportData,
        {
            responseType: "blob",
        }
    );

    return response;
}


// ==========================================
// DOWNLOAD MARKDOWN
// ==========================================

export async function downloadMarkdown(reportData) {

    const response = await api.post(
        "/api/v1/report/download/markdown",
        reportData,
        {
            responseType: "blob",
        }
    );

    return response;
}