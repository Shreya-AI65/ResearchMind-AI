import { useState } from "react";

import {
    FiDownload,
    FiFileText,
} from "react-icons/fi";

import {
    generateReport,
    downloadPDF,
    downloadDOCX,
    downloadMarkdown,
} from "../services/reportService";


function GenerateReport() {

    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);

    const [downloading, setDownloading] = useState("");

    const [result, setResult] = useState(null);

    const [reportData, setReportData] = useState(null);

    const [error, setError] = useState("");


    // ==========================================
    // GENERATE REPORT
    // ==========================================

    const handleGenerate = async () => {

        if (loading) {
            return;
        }

        if (!query.trim()) {

            setError("Please enter a research topic.");

            return;
        }


        setLoading(true);

        setError("");

        setResult(null);


        const data = {
            query: query.trim(),
            name: "Guest",
            age: 20,
            qualification: "B.Tech",
            experience_level: "Intermediate",
            explanation_style: "balanced",
            template: "technical",
        };


        try {

            console.log(
                "Generating report with:",
                data
            );


            const response =
                await generateReport(data);


            console.log(
                "Generated report:",
                response
            );


            setReportData(data);

            setResult(response);


        } catch (err) {

            console.error(
                "Generate report error:",
                err
            );


            setError(
                err.response?.data?.message ||
                err.response?.data?.detail ||
                err.userMessage ||
                "Failed to generate report."
            );


        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // SAVE BLOB FILE
    // ==========================================

    const saveBlobFile = (
        response,
        fallbackName
    ) => {

        const blob =
            new Blob(
                [response.data],
                {
                    type:
                        response.headers[
                            "content-type"
                        ] ||
                        "application/octet-stream",
                }
            );


        const url =
            window.URL.createObjectURL(
                blob
            );


        const link =
            document.createElement("a");


        link.href = url;


        const disposition =
            response.headers[
                "content-disposition"
            ];


        let filename =
            fallbackName;


        if (disposition) {

            const match =
                disposition.match(
                    /filename="?([^"]+)"?/i
                );


            if (match && match[1]) {

                filename =
                    match[1];

            }

        }


        link.setAttribute(
            "download",
            filename
        );


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        window.URL.revokeObjectURL(
            url
        );
    };


    // ==========================================
    // DOWNLOAD PDF
    // ==========================================

    const handleDownloadPDF =
        async () => {

            if (!reportData) {

                setError(
                    "Please generate a report first."
                );

                return;
            }


            if (downloading) {
                return;
            }


            try {

                setDownloading("pdf");

                setError("");


                const response =
                    await downloadPDF(
                        reportData
                    );


                console.log(
                    "PDF response:",
                    response
                );


                saveBlobFile(
                    response,
                    "Research_Report.pdf"
                );


            } catch (err) {

                console.error(
                    "PDF download error:",
                    err
                );


                setError(
                    err.response?.data?.message ||
                    err.response?.data?.detail ||
                    "Unable to download PDF report."
                );


            } finally {

                setDownloading("");

            }
        };


    // ==========================================
    // DOWNLOAD DOCX
    // ==========================================

    const handleDownloadDOCX =
        async () => {

            if (!reportData) {

                setError(
                    "Please generate a report first."
                );

                return;
            }


            if (downloading) {
                return;
            }


            try {

                setDownloading("docx");

                setError("");


                const response =
                    await downloadDOCX(
                        reportData
                    );


                console.log(
                    "DOCX response:",
                    response
                );


                saveBlobFile(
                    response,
                    "Research_Report.docx"
                );


            } catch (err) {

                console.error(
                    "DOCX download error:",
                    err
                );


                setError(
                    err.response?.data?.message ||
                    err.response?.data?.detail ||
                    "Unable to download DOCX report."
                );


            } finally {

                setDownloading("");

            }
        };


    // ==========================================
    // DOWNLOAD MARKDOWN
    // ==========================================

    const handleDownloadMarkdown =
        async () => {

            if (!reportData) {

                setError(
                    "Please generate a report first."
                );

                return;
            }


            if (downloading) {
                return;
            }


            try {

                setDownloading("markdown");

                setError("");


                const response =
                    await downloadMarkdown(
                        reportData
                    );


                console.log(
                    "Markdown response:",
                    response
                );


                saveBlobFile(
                    response,
                    "Research_Report.md"
                );


            } catch (err) {

                console.error(
                    "Markdown download error:",
                    err
                );


                setError(
                    err.response?.data?.message ||
                    err.response?.data?.detail ||
                    "Unable to download Markdown report."
                );


            } finally {

                setDownloading("");

            }
        };


    return (

        <div className="min-h-screen bg-sky-50 p-6 md:p-8">

            <div className="max-w-5xl mx-auto">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="mb-8">

                    <p className="text-sky-600 font-semibold">
                        ResearchMind AI
                    </p>


                    <h1 className="text-3xl font-bold text-gray-800 mt-2">

                        Generate Research Report

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Enter a research topic to generate
                        a comprehensive research report.

                    </p>

                </div>



                {/* =====================================
                    GENERATE FORM
                ===================================== */}

                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">


                    <label className="block font-semibold text-gray-700 mb-2">

                        Research Topic

                    </label>


                    <input
                        type="text"
                        value={query}
                        placeholder="Enter research topic"
                        disabled={loading}
                        onChange={(e) => {

                            setQuery(
                                e.target.value
                            );

                            setError("");

                        }}
                        onKeyDown={(e) => {

                            if (
                                e.key === "Enter" &&
                                !loading
                            ) {

                                handleGenerate();

                            }

                        }}
                        className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:bg-gray-100"
                    />


                    <button
                        type="button"
                        onClick={
                            handleGenerate
                        }
                        disabled={loading}
                        className="mt-4 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
                    >

                        {loading
                            ? "Generating Report..."
                            : "Generate Report"}

                    </button>

                </div>



                {/* =====================================
                    LOADING
                ===================================== */}

                {loading && (

                    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 mt-6">

                        <div className="flex items-center gap-3">

                            <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />

                            <p className="text-sky-600 font-semibold">

                                Generating Report...

                            </p>

                        </div>


                        <p className="text-gray-500 text-sm mt-3">

                            Please wait while
                            ResearchMind AI processes
                            your research topic.

                        </p>

                    </div>

                )}



                {/* =====================================
                    ERROR
                ===================================== */}

                {error && (

                    <div className="bg-white border border-red-200 rounded-2xl p-6 mt-6">

                        <p className="text-red-600 font-semibold">

                            Error

                        </p>


                        <p className="text-red-500 mt-2">

                            {error}

                        </p>

                    </div>

                )}



                {/* =====================================
                    SUCCESS
                ===================================== */}

                {result && !loading && (

                    <div className="mt-6">


                        <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-6">

                            <div className="flex items-center gap-3">

                                <div className="bg-green-100 text-green-600 p-3 rounded-full">

                                    <FiFileText
                                        size={24}
                                    />

                                </div>


                                <div>

                                    <h2 className="text-2xl font-bold text-gray-800">

                                        Report Generated Successfully

                                    </h2>


                                    <p className="text-gray-500 mt-1">

                                        Research topic:

                                        {" "}

                                        <span className="font-semibold text-gray-700">

                                            {query}

                                        </span>

                                    </p>

                                </div>

                            </div>

                        </div>



                        {/* =================================
                            DOWNLOAD OPTIONS
                        ================================= */}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">


                            {/* =================================
                                PDF
                            ================================= */}

                            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">

                                <FiFileText
                                    size={32}
                                    className="text-red-500 mb-4"
                                />


                                <h3 className="text-lg font-bold text-gray-800">

                                    PDF Report

                                </h3>


                                <p className="text-gray-500 text-sm mt-2">

                                    Download the research
                                    report in PDF format.

                                </p>


                                <button
                                    type="button"
                                    onClick={
                                        handleDownloadPDF
                                    }
                                    disabled={
                                        downloading !== ""
                                    }
                                    className="mt-5 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold"
                                >

                                    <FiDownload />


                                    {downloading ===
                                    "pdf"

                                        ? "Downloading..."

                                        : "Download PDF"}

                                </button>

                            </div>



                            {/* =================================
                                DOCX
                            ================================= */}

                            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">

                                <FiFileText
                                    size={32}
                                    className="text-blue-500 mb-4"
                                />


                                <h3 className="text-lg font-bold text-gray-800">

                                    DOCX Report

                                </h3>


                                <p className="text-gray-500 text-sm mt-2">

                                    Download the research
                                    report in DOCX format.

                                </p>


                                <button
                                    type="button"
                                    onClick={
                                        handleDownloadDOCX
                                    }
                                    disabled={
                                        downloading !== ""
                                    }
                                    className="mt-5 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold"
                                >

                                    <FiDownload />


                                    {downloading ===
                                    "docx"

                                        ? "Downloading..."

                                        : "Download DOCX"}

                                </button>

                            </div>



                            {/* =================================
                                MARKDOWN
                            ================================= */}

                            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                                <FiFileText
                                    size={32}
                                    className="text-sky-500 mb-4"
                                />


                                <h3 className="text-lg font-bold text-gray-800">

                                    Markdown Report

                                </h3>


                                <p className="text-gray-500 text-sm mt-2">

                                    Download the research
                                    report in Markdown format.

                                </p>


                                <button
                                    type="button"
                                    onClick={
                                        handleDownloadMarkdown
                                    }
                                    disabled={
                                        downloading !== ""
                                    }
                                    className="mt-5 inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold"
                                >

                                    <FiDownload />


                                    {downloading ===
                                    "markdown"

                                        ? "Downloading..."

                                        : "Download Markdown"}

                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );
}


export default GenerateReport;