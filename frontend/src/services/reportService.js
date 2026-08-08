import api from "./api";

// ==========================================
// GENERATE REPORT
// ==========================================

export const generateReport = async (reportData) => {
    const response = await api.post(
        "/api/v1/report",
        reportData
    );

    console.log(
        "Generate Report API Response:",
        response.data
    );

    return response.data;
};


// ==========================================
// EXTRACT FILENAME
// ==========================================

const extractFilename = (filePath) => {

    if (!filePath) {
        return null;
    }

    // Handle string path
    if (typeof filePath === "string") {

        const normalizedPath =
            filePath.replace(/\\/g, "/");

        const filename =
            normalizedPath
                .split("/")
                .pop();

        return filename || null;
    }


    // Handle object accidentally passed
    if (typeof filePath === "object") {

        const possiblePath =
            filePath?.pdf_file ||
            filePath?.docx_file ||
            filePath?.markdown_file ||
            filePath?.filename ||
            filePath?.file ||
            filePath?.path ||
            filePath?.file_path;

        if (typeof possiblePath === "string") {

            return possiblePath
                .replace(/\\/g, "/")
                .split("/")
                .pop();
        }
    }


    return null;
};


// ==========================================
// DOWNLOAD FILE
// ==========================================

const downloadFile = async (filePath) => {

    const filename =
        extractFilename(filePath);


    if (!filename) {

        console.error(
            "Invalid download file path:",
            filePath
        );

        throw new Error(
            "Report filename was not found."
        );
    }


    console.log(
        "Downloading report file:",
        filename
    );


    const url =
        `/api/v1/report/download/${encodeURIComponent(
            filename
        )}`;


    console.log(
        "Download URL:",
        url
    );


    const response =
        await api.get(
            url,
            {
                responseType: "blob",
            }
        );


    console.log(
        "Download response:",
        response
    );


    return response;
};


// ==========================================
// DOWNLOAD PDF
// ==========================================

export const downloadPDF = async (
    filePath
) => {

    return downloadFile(
        filePath
    );
};


// ==========================================
// DOWNLOAD DOCX
// ==========================================

export const downloadDOCX = async (
    filePath
) => {

    return downloadFile(
        filePath
    );
};


// ==========================================
// DOWNLOAD MARKDOWN
// ==========================================

export const downloadMarkdown = async (
    filePath
) => {

    return downloadFile(
        filePath
    );
};


// ==========================================
// DOWNLOAD URL
// ==========================================

export const getDownloadUrl = (
    filePath
) => {

    const filename =
        extractFilename(
            filePath
        );


    if (!filename) {
        return null;
    }


    return (
        `http://127.0.0.1:8000` +
        `/api/v1/report/download/` +
        `${encodeURIComponent(filename)}`
    );
};