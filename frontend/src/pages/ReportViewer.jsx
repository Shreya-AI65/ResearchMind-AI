import { Link, useLocation } from "react-router-dom";
import {
    FiArrowLeft,
    FiFileText,
    FiDownload,
} from "react-icons/fi";
import { useState } from "react";

import api from "../services/api";

function ReportViewer() {

    const location = useLocation();

    const report = location.state?.report;

    const [downloading, setDownloading] = useState("");

    const [downloadMessage, setDownloadMessage] = useState("");


    const handleDownload = async (type) => {

        try {

            setDownloading(type);

            setDownloadMessage("");


            let endpoint = "/api/v1/report/download";

            let filename =
                report?.pdf || "Research_Report.pdf";


            if (type === "docx") {

                endpoint =
                    "/api/v1/report/download/docx";

                filename =
                    report?.docx ||
                    "Research_Report.docx";

            }


            if (type === "markdown") {

                endpoint =
                    "/api/v1/report/download/markdown";

                filename =
                    report?.markdown ||
                    "Research_Report.md";

            }


            const response = await api.post(

                endpoint,

                {
                    query:
                        report?.research_topic ||
                        "Research Report",

                    name: "Guest",

                    age: 20,

                    qualification: "B.Tech",

                    experience_level: "Intermediate",

                    explanation_style: "balanced",

                    template: "technical",
                },

                {
                    responseType: "blob",
                }

            );


            const blob = new Blob(

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
                window.URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href = url;

            link.download = filename;


            document.body.appendChild(link);

            link.click();

            link.remove();


            window.URL.revokeObjectURL(url);


            setDownloadMessage(
                `${type.toUpperCase()} report downloaded successfully.`
            );


        } catch (error) {

            console.error(
                "Download error:",
                error
            );


            setDownloadMessage(
                `Failed to download ${type.toUpperCase()} report.`
            );


        } finally {

            setDownloading("");

        }

    };


    if (!report) {

        return (

            <div className="min-h-screen bg-sky-50 p-8">

                <Link
                    to="/report-history"
                    className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-6"
                >

                    <FiArrowLeft />

                    Back to Report History

                </Link>


                <div className="bg-white rounded-2xl border border-sky-100 p-12 text-center">

                    <FiFileText
                        size={48}
                        className="mx-auto text-sky-400 mb-4"
                    />


                    <h1 className="text-2xl font-bold text-gray-800">

                        Report Not Found

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Please select a report from Report History.

                    </p>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-sky-50 p-6 md:p-8">


            {/* Back Button */}

            <Link
                to="/report-history"
                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mb-6"
            >

                <FiArrowLeft />

                Back to Report History

            </Link>


            {/* Report Header */}

            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 mb-6">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div>

                        <p className="text-sky-600 font-semibold">

                            Research Report

                        </p>


                        <h1 className="text-3xl font-bold text-gray-800 mt-2">

                            {
                                report.research_topic ||
                                "Research Report"
                            }

                        </h1>


                        <p className="text-gray-500 mt-2">

                            Generated on{" "}

                            {
                                report.generated_at ||
                                "-"
                            }

                        </p>

                    </div>


                    <div className="bg-sky-100 text-sky-700 px-5 py-3 rounded-xl font-bold">

                        Version {report.version || 1}

                    </div>

                </div>

            </div>


            {/* Report Files */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">


                {/* PDF */}

                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                    <FiFileText
                        size={30}
                        className="text-red-500 mb-4"
                    />


                    <h2 className="text-lg font-bold text-gray-800">

                        PDF Report

                    </h2>


                    {report.pdf ? (

                        <button
                            onClick={() =>
                                handleDownload("pdf")
                            }
                            disabled={downloading !== ""}
                            className="mt-2 text-sm text-sky-600 hover:text-sky-800 hover:underline break-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >

                            {report.pdf}

                        </button>

                    ) : (

                        <p className="text-gray-500 text-sm mt-2">

                            Not available

                        </p>

                    )}

                </div>


                {/* DOCX */}

                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                    <FiFileText
                        size={30}
                        className="text-blue-500 mb-4"
                    />


                    <h2 className="text-lg font-bold text-gray-800">

                        DOCX Report

                    </h2>


                    {report.docx ? (

                        <button
                            onClick={() =>
                                handleDownload("docx")
                            }
                            disabled={downloading !== ""}
                            className="mt-2 text-sm text-sky-600 hover:text-sky-800 hover:underline break-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >

                            {report.docx}

                        </button>

                    ) : (

                        <p className="text-gray-500 text-sm mt-2">

                            Not available

                        </p>

                    )}

                </div>


                {/* Markdown */}

                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                    <FiFileText
                        size={30}
                        className="text-sky-500 mb-4"
                    />


                    <h2 className="text-lg font-bold text-gray-800">

                        Markdown Report

                    </h2>


                    {report.markdown ? (

                        <button
                            onClick={() =>
                                handleDownload("markdown")
                            }
                            disabled={downloading !== ""}
                            className="mt-2 text-sm text-sky-600 hover:text-sky-800 hover:underline break-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >

                            {report.markdown}

                        </button>

                    ) : (

                        <p className="text-gray-500 text-sm mt-2">

                            Not available

                        </p>

                    )}

                </div>

            </div>


            {/* Download Section */}

            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                <h2 className="text-xl font-bold text-gray-800">

                    Report Downloads

                </h2>


                <p className="text-gray-500 mt-1 mb-6">

                    Download the generated research report
                    in your preferred format.

                </p>


                <div className="flex flex-wrap gap-4">


                    {/* PDF */}

                    <button
                        onClick={() =>
                            handleDownload("pdf")
                        }
                        disabled={downloading !== ""}
                        className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg"
                    >

                        <FiDownload />

                        {
                            downloading === "pdf"
                                ? "Downloading..."
                                : "Download PDF"
                        }

                    </button>


                    {/* DOCX */}

                    <button
                        onClick={() =>
                            handleDownload("docx")
                        }
                        disabled={downloading !== ""}
                        className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-lg"
                    >

                        <FiDownload />

                        {
                            downloading === "docx"
                                ? "Downloading..."
                                : "Download DOCX"
                        }

                    </button>


                    {/* Markdown */}

                    <button
                        onClick={() =>
                            handleDownload("markdown")
                        }
                        disabled={downloading !== ""}
                        className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-lg"
                    >

                        <FiDownload />

                        {
                            downloading === "markdown"
                                ? "Downloading..."
                                : "Download Markdown"
                        }

                    </button>

                </div>


                {/* Download Status */}

                {downloadMessage && (

                    <div className="mt-5 bg-sky-50 border border-sky-100 rounded-lg p-4">

                        <p className="text-sky-600 font-medium">

                            {downloadMessage}

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default ReportViewer;