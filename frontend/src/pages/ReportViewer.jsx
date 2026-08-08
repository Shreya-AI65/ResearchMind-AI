import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    FiArrowLeft,
    FiDownload,
    FiFileText,
    FiRefreshCw,
} from "react-icons/fi";

import api from "../services/api";


// ======================================================
// EXTRACT FILENAME
// ======================================================

const extractFilename = (filePath) => {

    if (!filePath) {
        return null;
    }

    if (typeof filePath !== "string") {
        return null;
    }

    const normalizedPath =
        filePath.replace(/\\/g, "/");

    const filename =
        normalizedPath
            .split("/")
            .pop();

    return filename || null;
};


// ======================================================
// FIND FILE PATH
// ======================================================

const findFilePath = (report, type) => {

    if (!report) {
        return null;
    }


    // --------------------------------------------------
    // Possible field names
    // --------------------------------------------------

    const keys = {

        pdf: [
            "pdf_file",
            "pdf",
            "pdf_path",
            "pdf_filename",
        ],

        docx: [
            "docx_file",
            "docx",
            "docx_path",
            "docx_filename",
        ],

        markdown: [
            "markdown_file",
            "markdown",
            "md_file",
            "md",
            "markdown_path",
            "markdown_filename",
        ],

    };


    // --------------------------------------------------
    // Search current object
    // --------------------------------------------------

    for (const key of keys[type]) {

        if (
            typeof report[key] === "string" &&
            report[key].trim()
        ) {

            return report[key];

        }

    }


    // --------------------------------------------------
    // Search generated_files
    // --------------------------------------------------

    const generatedFiles =
        report.generated_files ||
        report.analytics?.generated_files ||
        report.data?.generated_files ||
        report.data?.analytics?.generated_files;


    if (generatedFiles) {

        for (const key of keys[type]) {

            if (
                typeof generatedFiles[key] === "string" &&
                generatedFiles[key].trim()
            ) {

                return generatedFiles[key];

            }

        }

    }


    // --------------------------------------------------
    // Search nested data
    // --------------------------------------------------

    if (report.data) {

        for (const key of keys[type]) {

            if (
                typeof report.data[key] === "string" &&
                report.data[key].trim()
            ) {

                return report.data[key];

            }

        }

    }


    // --------------------------------------------------
    // Search report.result
    // --------------------------------------------------

    if (report.result) {

        for (const key of keys[type]) {

            if (
                typeof report.result[key] === "string" &&
                report.result[key].trim()
            ) {

                return report.result[key];

            }

        }

    }


    return null;
};


// ======================================================
// REPORT VIEWER
// ======================================================

function ReportViewer() {

    const location = useLocation();

    const navigate = useNavigate();


    // ==================================================
    // REPORT STATE
    // ==================================================

    const [report, setReport] = useState(
        location.state?.report || null
    );


    const [loading, setLoading] =
        useState(false);


    const [downloadLoading, setDownloadLoading] =
        useState(null);


    const [error, setError] =
        useState(null);


    // ==================================================
    // UPDATE REPORT WHEN LOCATION CHANGES
    // ==================================================

    useEffect(() => {

        if (location.state?.report) {

            setReport(
                location.state.report
            );

        }

    }, [location.state]);


    // ==================================================
    // DEBUG REPORT OBJECT
    // ==================================================

    useEffect(() => {

        if (report) {

            console.log(
                "===================================="
            );

            console.log(
                "REPORT VIEWER FULL REPORT:",
                report
            );

            console.log(
                "===================================="
            );

        }

    }, [report]);


    // ==================================================
    // DOWNLOAD FILE
    // ==================================================

    const handleDownload = async (
        filePath,
        type
    ) => {

        try {

            setError(null);

            setDownloadLoading(type);


            // ------------------------------------------
            // Extract filename
            // ------------------------------------------

            const filename =
                extractFilename(filePath);


            console.log(
                `${type.toUpperCase()} original path:`,
                filePath
            );


            console.log(
                `${type.toUpperCase()} filename:`,
                filename
            );


            if (!filename) {

                throw new Error(
                    `${type.toUpperCase()} filename is not available.`
                );

            }


            // ------------------------------------------
            // Build API URL
            // ------------------------------------------

            const url =
                `/api/v1/report/download/${encodeURIComponent(
                    filename
                )}`;


            console.log(
                "DOWNLOAD URL:",
                url
            );


            // ------------------------------------------
            // Download file
            // ------------------------------------------

            const response =
                await api.get(
                    url,
                    {
                        responseType: "blob",
                    }
                );


            console.log(
                "DOWNLOAD RESPONSE:",
                response
            );


            // ------------------------------------------
            // Check response
            // ------------------------------------------

            if (
                !response.data ||
                response.data.size === 0
            ) {

                throw new Error(
                    "Downloaded file is empty."
                );

            }


            // ------------------------------------------
            // Create blob
            // ------------------------------------------

            const contentType =
                response.headers[
                    "content-type"
                ] ||
                "application/octet-stream";


            const blob =
                new Blob(
                    [response.data],
                    {
                        type: contentType,
                    }
                );


            // ------------------------------------------
            // Create download URL
            // ------------------------------------------

            const downloadUrl =
                window.URL.createObjectURL(
                    blob
                );


            // ------------------------------------------
            // Create download link
            // ------------------------------------------

            const link =
                document.createElement("a");


            link.href =
                downloadUrl;


            link.download =
                filename;


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            // ------------------------------------------
            // Cleanup
            // ------------------------------------------

            window.URL.revokeObjectURL(
                downloadUrl
            );


            console.log(
                "DOWNLOAD SUCCESS:",
                filename
            );

        }

        catch (err) {

            console.error(
                "Download error:",
                err
            );


            setError(
                err?.userMessage ||
                err?.message ||
                "Unable to download the report."
            );

        }

        finally {

            setDownloadLoading(null);

        }

    };


    // ==================================================
    // REFRESH
    // ==================================================

    const handleRefresh = () => {

        setLoading(true);

        setTimeout(() => {

            setLoading(false);

        }, 500);

    };


    // ==================================================
    // REPORT NOT FOUND
    // ==================================================

    if (!report) {

        return (

            <div className="min-h-screen bg-slate-50 p-6">

                <div className="max-w-5xl mx-auto">


                    <button
                        onClick={() =>
                            navigate(-1)
                        }
                        className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mb-6"
                    >

                        <FiArrowLeft />

                        Back

                    </button>


                    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-10 text-center">


                        <FiFileText
                            size={50}
                            className="mx-auto text-sky-400 mb-4"
                        />


                        <h1 className="text-2xl font-bold text-gray-800">

                            Report Not Found

                        </h1>


                        <p className="text-gray-500 mt-2">

                            The selected research report
                            could not be loaded.

                        </p>


                        <button
                            onClick={() =>
                                navigate(
                                    "/report-history"
                                )
                            }
                            className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-lg"
                        >

                            Go to Report History

                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // ==================================================
    // GET FILE PATHS
    // ==================================================

    const pdfPath =
        findFilePath(
            report,
            "pdf"
        );


    const docxPath =
        findFilePath(
            report,
            "docx"
        );


    const markdownPath =
        findFilePath(
            report,
            "markdown"
        );


    // ==================================================
    // GET FILENAMES
    // ==================================================

    const pdfFilename =
        extractFilename(
            pdfPath
        );


    const docxFilename =
        extractFilename(
            docxPath
        );


    const markdownFilename =
        extractFilename(
            markdownPath
        );


    // ==================================================
    // IMPORTANT DEBUG
    // ==================================================

    console.log(
        "===================================="
    );

    console.log(
        "REPORT VIEWER FILE INFORMATION:",
        {
            pdfPath,
            pdfFilename,

            docxPath,
            docxFilename,

            markdownPath,
            markdownFilename,
        }
    );

    console.log(
        "===================================="
    );


    // ==================================================
    // REPORT CONTENT
    // ==================================================

    const reportContent =
        report.report ||
        report.content ||
        report.final_report ||
        report.report_content ||
        report.data?.report ||
        report.data?.content ||
        report.data?.final_report ||
        null;


    // ==================================================
    // TOPIC
    // ==================================================

    const topic =
        report.query ||
        report.topic ||
        report.research_topic ||
        report.researchTopic ||
        report.data?.query ||
        report.data?.topic ||
        report.data?.research_topic ||
        "Research Report";


    // ==================================================
    // VERSION
    // ==================================================

    const version =
        report.version ||
        report.data?.version ||
        report.analytics?.version ||
        "—";


    // ==================================================
    // DATE
    // ==================================================

    const createdAt =
        report.created_at ||
        report.generated_at ||
        report.createdAt ||
        report.timestamp ||
        report.data?.created_at ||
        report.data?.generated_at ||
        null;


    // ==================================================
    // FORMAT DATE
    // ==================================================

    const formatDate = (date) => {

        if (!date) {

            return "Date unavailable";

        }


        try {

            return new Date(
                date
            ).toLocaleString();

        }

        catch {

            return String(date);

        }

    };


    // ==================================================
    // RENDER
    // ==================================================

    return (

        <div className="min-h-screen bg-slate-50 p-6">

            <div className="max-w-6xl mx-auto">


                {/* ======================================
                    HEADER
                ====================================== */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">


                    <div>


                        <button
                            onClick={() =>
                                navigate(-1)
                            }
                            className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mb-4"
                        >

                            <FiArrowLeft />

                            Back

                        </button>


                        <p className="text-sky-600 font-semibold">

                            ResearchMind AI

                        </p>


                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">

                            Research Report

                        </h1>


                        <p className="text-gray-500 mt-2">

                            {topic}

                        </p>


                    </div>


                    <button
                        onClick={handleRefresh}
                        className="flex items-center justify-center gap-2 border border-sky-200 bg-white hover:bg-sky-50 text-sky-600 px-4 py-2.5 rounded-lg font-semibold"
                    >

                        <FiRefreshCw
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>


                </div>


                {/* ======================================
                    REPORT INFORMATION
                ====================================== */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">


                    <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm">

                        <p className="text-sm text-gray-500">

                            Research Topic

                        </p>


                        <h2 className="text-lg font-bold text-gray-800 mt-2">

                            {topic}

                        </h2>

                    </div>


                    <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm">

                        <p className="text-sm text-gray-500">

                            Report Version

                        </p>


                        <h2 className="text-lg font-bold text-gray-800 mt-2">

                            Version {version}

                        </h2>

                    </div>


                    <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm">

                        <p className="text-sm text-gray-500">

                            Generated

                        </p>


                        <h2 className="text-lg font-bold text-gray-800 mt-2">

                            {formatDate(
                                createdAt
                            )}

                        </h2>

                    </div>


                </div>


                {/* ======================================
                    DOWNLOAD ERROR
                ====================================== */}

                {error && (

                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">

                        <p className="font-semibold">

                            Download Error

                        </p>


                        <p className="text-sm mt-1">

                            {error}

                        </p>

                    </div>

                )}


                {/* ======================================
                    DOWNLOAD SECTION
                ====================================== */}

                <div className="bg-white border border-sky-100 rounded-2xl shadow-sm p-6 mb-6">


                    <div className="flex items-center gap-3 mb-2">

                        <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">

                            <FiDownload
                                size={22}
                            />

                        </div>


                        <div>

                            <h2 className="text-xl font-bold text-gray-800">

                                Download Report

                            </h2>


                            <p className="text-gray-500 text-sm">

                                Download this report in
                                your preferred format.

                            </p>

                        </div>

                    </div>


                    {/* ==================================
                        FILE STATUS
                    ================================== */}

                    <div className="bg-slate-50 rounded-xl p-4 mb-5 mt-5">


                        <p className="text-sm font-semibold text-gray-700 mb-3">

                            Available Files

                        </p>


                        <div className="space-y-2 text-sm">


                            <div className="flex items-center justify-between">

                                <span className="text-gray-500">

                                    PDF

                                </span>


                                <span
                                    className={
                                        pdfFilename
                                            ? "text-green-600 font-semibold"
                                            : "text-red-500"
                                    }
                                >

                                    {pdfFilename ||
                                        "Not available"}

                                </span>

                            </div>


                            <div className="flex items-center justify-between">

                                <span className="text-gray-500">

                                    DOCX

                                </span>


                                <span
                                    className={
                                        docxFilename
                                            ? "text-green-600 font-semibold"
                                            : "text-red-500"
                                    }
                                >

                                    {docxFilename ||
                                        "Not available"}

                                </span>

                            </div>


                            <div className="flex items-center justify-between">

                                <span className="text-gray-500">

                                    Markdown

                                </span>


                                <span
                                    className={
                                        markdownFilename
                                            ? "text-green-600 font-semibold"
                                            : "text-red-500"
                                    }
                                >

                                    {markdownFilename ||
                                        "Not available"}

                                </span>

                            </div>


                        </div>

                    </div>


                    {/* ==================================
                        DOWNLOAD BUTTONS
                    ================================== */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                        {/* PDF */}

                        <button
                            disabled={
                                !pdfPath ||
                                downloadLoading !== null
                            }
                            onClick={() =>
                                handleDownload(
                                    pdfPath,
                                    "pdf"
                                )
                            }
                            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg font-semibold transition"
                        >

                            <FiDownload />

                            {downloadLoading === "pdf"
                                ? "Downloading..."
                                : "Download PDF"}

                        </button>


                        {/* DOCX */}

                        <button
                            disabled={
                                !docxPath ||
                                downloadLoading !== null
                            }
                            onClick={() =>
                                handleDownload(
                                    docxPath,
                                    "docx"
                                )
                            }
                            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg font-semibold transition"
                        >

                            <FiDownload />

                            {downloadLoading === "docx"
                                ? "Downloading..."
                                : "Download DOCX"}

                        </button>


                        {/* MARKDOWN */}

                        <button
                            disabled={
                                !markdownPath ||
                                downloadLoading !== null
                            }
                            onClick={() =>
                                handleDownload(
                                    markdownPath,
                                    "markdown"
                                )
                            }
                            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg font-semibold transition"
                        >

                            <FiDownload />

                            {downloadLoading === "markdown"
                                ? "Downloading..."
                                : "Download Markdown"}

                        </button>


                    </div>


                    {/* ==================================
                        NO FILES
                    ================================== */}

                    {!pdfPath &&
                        !docxPath &&
                        !markdownPath && (

                            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-5">

                                <p className="font-semibold text-orange-700">

                                    Download files are not
                                    available for this report.

                                </p>


                                <p className="text-sm text-orange-600 mt-1">

                                    The report history response
                                    does not contain the generated
                                    file paths.

                                </p>

                            </div>

                        )}

                </div>


                {/* ======================================
                    REPORT CONTENT
                ====================================== */}

                <div className="bg-white border border-sky-100 rounded-2xl shadow-sm">


                    <div className="p-6 border-b border-gray-100">


                        <div className="flex items-center gap-3">


                            <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">

                                <FiFileText
                                    size={24}
                                />

                            </div>


                            <div>

                                <h2 className="text-xl font-bold text-gray-800">

                                    Research Report

                                </h2>


                                <p className="text-sm text-gray-500">

                                    {topic}

                                </p>

                            </div>


                        </div>


                    </div>


                    <div className="p-6">


                        {typeof reportContent === "string" ? (

                            <div className="whitespace-pre-wrap text-gray-700 leading-7">

                                {reportContent}

                            </div>

                        ) : reportContent ? (

                            <pre className="bg-slate-50 rounded-xl p-5 overflow-auto text-sm text-gray-700">

                                {JSON.stringify(
                                    reportContent,
                                    null,
                                    2
                                )}

                            </pre>

                        ) : (

                            <div className="text-center py-12">


                                <FiFileText
                                    size={40}
                                    className="mx-auto text-gray-300 mb-4"
                                />


                                <p className="text-gray-500">

                                    Report content is not
                                    available in the history
                                    response.

                                </p>


                            </div>

                        )}

                    </div>


                </div>


                {/* ======================================
                    BACK BUTTON
                ====================================== */}

                <div className="flex justify-center mt-8">


                    <button
                        onClick={() =>
                            navigate(
                                "/report-history"
                            )
                        }
                        className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold"
                    >

                        <FiArrowLeft />

                        Back to Report History

                    </button>


                </div>


            </div>

        </div>

    );

}


export default ReportViewer;