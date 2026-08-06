import api from "./api";

export const downloadPDF = async (data) => {

    const response = await api.post(

        "/api/v1/report/download",

        data,

        {

            responseType: "blob"

        }

    );

    return response.data;

};

export const downloadDOCX = async (data) => {

    const response = await api.post(

        "/api/v1/report/download/docx",

        data,

        {

            responseType: "blob"

        }

    );

    return response.data;

};

export const downloadMarkdown = async (data) => {

    const response = await api.post(

        "/api/v1/report/download/markdown",

        data,

        {

            responseType: "blob"

        }

    );

    return response.data;

};