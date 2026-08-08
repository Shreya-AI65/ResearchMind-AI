import { useState } from "react";

import {
    FiFileText,
    FiDownload,
    FiCheckCircle,
    FiClock,
} from "react-icons/fi";

import {
    generateReport,
    downloadPDF,
    downloadDOCX,
    downloadMarkdown,
} from "../services/reportService";


function GenerateReport() {

    // ==========================================
    // FORM STATE
    // ==========================================

    const [query, setQuery] = useState("");

    const [name, setName] = useState("Guest");

    const [age, setAge] = useState(20);

    const [qualification, setQualification] =
        useState("B.Tech");

    const [experienceLevel, setExperienceLevel] =
        useState("Intermediate");

    const [explanationStyle, setExplanationStyle] =
        useState("balanced");

    const [template, setTemplate] =
        useState("technical");


    // ==========================================
    // REPORT STATE
    // ==========================================

    const [generatedReport, setGeneratedReport] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [downloading, setDownloading] =
        useState("");

    const [error, setError] =
        useState("");

    const [downloadSuccess, setDownloadSuccess] =
        useState("");


    // ==========================================
    // GENERATE REPORT
    // ==========================================

    const handleGenerateReport = async (event) => {

        event.preventDefault();

        if (!query.trim()) {

            setError(
                "Please enter a research topic."
            );

            return;
        }


        try {

            setLoading(true);

            setError("");

            setDownloadSuccess("");

            setGeneratedReport(null);


            const requestData = {

                query: query.trim(),

                name:
                    name.trim() || "Guest",

                age:
                    Number(age) || 20,

                qualification:
                    qualification.trim() || "B.Tech",

                experience_level:
                    experienceLevel,

                explanation_style:
                    explanationStyle,

                template:
                    template,
            };


            console.log(
                "Generating report with:",
                requestData
            );


            const response =
                await generateReport(
                    requestData
                );


            console.log(
                "Generated report:",
                response
            );


            if (
                response?.success === false
            ) {

                throw new Error(
                    response?.message ||
                    "Report generation failed."
                );
            }


            setGeneratedReport(
                response
            );


        } catch (err) {

            console.error(
                "Report generation error:",
                err
            );


            setError(
                err.userMessage ||
                err.response?.data?.message ||
                err.response?.data?.detail ||
                err.message ||
                "Failed to generate report."
            );


        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // GET REPORT DATA
    // ==========================================

    const getReportData = () => {

        if (!generatedReport) {
            return null;
        }


        return (
            generatedReport?.data ||
            generatedReport
        );
    };


    // ==========================================
    // GET FILE PATH
    // ==========================================

    const getFilePath = (type) => {

        const data =
            getReportData();


        if (!data) {
            return null;
        }


        if (type === "pdf") {

            return (
                data?.pdf_file ||
                data?.analytics
                    ?.generated_files
                    ?.pdf ||
                null
            );
        }


        if (type === "docx") {

            return (
                data?.docx_file ||
                data?.analytics
                    ?.generated_files
                    ?.docx ||
                null
            );
        }


        if (type === "markdown") {

            return (
                data?.markdown_file ||
                data?.analytics
                    ?.generated_files
                    ?.markdown ||
                null
            );
        }


        return null;
    };


    // ==========================================
    // SAVE DOWNLOADED BLOB
    // ==========================================

    const saveBlob = (
        response,
        filename
    ) => {

        if (!response?.data) {

            throw new Error(
                "Downloaded file is empty."
            );
        }


        const blob =
            response.data instanceof Blob
                ? response.data
                : new Blob([
                    response.data
                ]);


        const url =
            window.URL.createObjectURL(
                blob
            );


        const link =
            document.createElement("a");


        link.href = url;

        link.download = filename;


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

    const handleDownloadPDF = async () => {

        const filePath =
            getFilePath("pdf");


        if (!filePath) {

            setError(
                "PDF file is not available."
            );

            return;
        }


        try {

            setDownloading("pdf");

            setError("");

            setDownloadSuccess("");


            console.log(
                "PDF file path:",
                filePath
            );


            const response =
                await downloadPDF(
                    filePath
                );


            console.log(
                "PDF response:",
                response
            );


            saveBlob(
                response,
                "Research_Report.pdf"
            );


            setDownloadSuccess(
                "PDF downloaded successfully."
            );


        } catch (err) {

            console.error(
                "PDF download error:",
                err
            );


            setError(
                err.userMessage ||
                err.response?.data?.message ||
                err.message ||
                "Failed to download PDF."
            );


        } finally {

            setDownloading("");

        }
    };


    // ==========================================
    // DOWNLOAD DOCX
    // ==========================================

    const handleDownloadDOCX = async () => {

        const filePath =
            getFilePath("docx");


        if (!filePath) {

            setError(
                "DOCX file is not available."
            );

            return;
        }


        try {

            setDownloading("docx");

            setError("");

            setDownloadSuccess("");


            console.log(
                "DOCX file path:",
                filePath
            );


            const response =
                await downloadDOCX(
                    filePath
                );


            console.log(
                "DOCX response:",
                response
            );


            saveBlob(
                response,
                "Research_Report.docx"
            );


            setDownloadSuccess(
                "DOCX downloaded successfully."
            );


        } catch (err) {

            console.error(
                "DOCX download error:",
                err
            );


            setError(
                err.userMessage ||
                err.response?.data?.message ||
                err.message ||
                "Failed to download DOCX."
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

            const filePath =
                getFilePath(
                    "markdown"
                );


            if (!filePath) {

                setError(
                    "Markdown file is not available."
                );

                return;
            }


            try {

                setDownloading(
                    "markdown"
                );

                setError("");

                setDownloadSuccess("");


                console.log(
                    "Markdown file path:",
                    filePath
                );


                const response =
                    await downloadMarkdown(
                        filePath
                    );


                console.log(
                    "Markdown response:",
                    response
                );


                saveBlob(
                    response,
                    "Research_Report.md"
                );


                setDownloadSuccess(
                    "Markdown file downloaded successfully."
                );


            } catch (err) {

                console.error(
                    "Markdown download error:",
                    err
                );


                setError(
                    err.userMessage ||
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to download Markdown."
                );


            } finally {

                setDownloading("");

            }
        };


    // ==========================================
    // REPORT INFORMATION
    // ==========================================

    const reportData =
        getReportData();


    const version =
        reportData?.version || "-";


    const executionTime =
        reportData?.execution_time;


    const qualityScore =
        reportData
            ?.analytics
            ?.quality
            ?.score;


    const qualityText =
        reportData
            ?.analytics
            ?.quality
            ?.quality;


    const pdfFile =
        getFilePath("pdf");


    const docxFile =
        getFilePath("docx");


    const markdownFile =
        getFilePath(
            "markdown"
        );


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="min-h-screen bg-sky-50 p-6 md:p-8">

            <div className="max-w-6xl mx-auto">


                {/* ======================================
                    HEADER
                ====================================== */}

                <div className="mb-8">

                    <p className="text-sky-600 font-semibold">

                        ResearchMind AI

                    </p>


                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">

                        Generate Research Report

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Generate an AI-powered research report
                        from your selected research topic.

                    </p>

                </div>



                {/* ======================================
                    ERROR MESSAGE
                ====================================== */}

                {error && (

                    <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">

                        <p className="text-red-600 font-medium">

                            {error}

                        </p>

                    </div>

                )}



                {/* ======================================
                    SUCCESS MESSAGE
                ====================================== */}

                {downloadSuccess && (

                    <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">

                        <div className="flex items-center gap-2 text-green-600 font-medium">

                            <FiCheckCircle />

                            {downloadSuccess}

                        </div>

                    </div>

                )}



                {/* ======================================
                    REPORT FORM
                ====================================== */}

                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 mb-8">

                    <form
                        onSubmit={
                            handleGenerateReport
                        }
                    >


                        {/* Research Topic */}

                        <div className="mb-6">

                            <label className="block text-sm font-semibold text-gray-700 mb-2">

                                Research Topic

                            </label>


                            <input
                                type="text"
                                value={query}
                                onChange={(event) =>
                                    setQuery(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter research topic, e.g. Agentic AI"
                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-lg
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-sky-300
                                "
                            />

                        </div>



                        {/* ======================================
                            USER DETAILS
                        ====================================== */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">


                            {/* Name */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">

                                    Name

                                </label>


                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-lg
                                        px-4
                                        py-3
                                    "
                                />

                            </div>



                            {/* Age */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">

                                    Age

                                </label>


                                <input
                                    type="number"
                                    min="1"
                                    value={age}
                                    onChange={(event) =>
                                        setAge(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-lg
                                        px-4
                                        py-3
                                    "
                                />

                            </div>



                            {/* Qualification */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">

                                    Qualification

                                </label>


                                <input
                                    type="text"
                                    value={
                                        qualification
                                    }
                                    onChange={(event) =>
                                        setQualification(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-lg
                                        px-4
                                        py-3
                                    "
                                />

                            </div>



                            {/* Experience Level */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">

                                    Experience Level

                                </label>


                                <select
                                    value={
                                        experienceLevel
                                    }
                                    onChange={(event) =>
                                        setExperienceLevel(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-lg
                                        px-4
                                        py-3
                                        bg-white
                                    "
                                >

                                    <option value="Beginner">
                                        Beginner
                                    </option>

                                    <option value="Intermediate">
                                        Intermediate
                                    </option>

                                    <option value="Advanced">
                                        Advanced
                                    </option>

                                </select>

                            </div>



                            {/* Explanation Style */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">

                                    Explanation Style

                                </label>


                                <select
                                    value={
                                        explanationStyle
                                    }
                                    onChange={(event) =>
                                        setExplanationStyle(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-lg
                                        px-4
                                        py-3
                                        bg-white
                                    "
                                >

                                    <option value="simple">
                                        Simple
                                    </option>

                                    <option value="balanced">
                                        Balanced
                                    </option>

                                    <option value="detailed">
                                        Detailed
                                    </option>

                                </select>

                            </div>



                            {/* Template */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">

                                    Report Template

                                </label>


                                <select
                                    value={template}
                                    onChange={(event) =>
                                        setTemplate(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-lg
                                        px-4
                                        py-3
                                        bg-white
                                    "
                                >

                                    <option value="technical">
                                        Technical
                                    </option>

                                    <option value="academic">
                                        Academic
                                    </option>

                                    <option value="general">
                                        General
                                    </option>

                                </select>

                            </div>

                        </div>



                        {/* ======================================
                            GENERATE BUTTON
                        ====================================== */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                bg-sky-500
                                hover:bg-sky-600
                                disabled:bg-sky-300
                                disabled:cursor-not-allowed
                                text-white
                                px-6
                                py-3
                                rounded-lg
                                font-semibold
                                transition
                            "
                        >

                            {loading ? (

                                <>

                                    <FiClock />

                                    Generating Report...

                                </>

                            ) : (

                                <>

                                    <FiFileText />

                                    Generate Report

                                </>

                            )}

                        </button>

                    </form>

                </div>



                {/* ======================================
                    GENERATED REPORT
                ====================================== */}

                {generatedReport && (

                    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">


                        {/* Report Header */}

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                            <div>

                                <p className="text-sky-600 font-semibold">

                                    Report Generated Successfully

                                </p>


                                <h2 className="text-2xl font-bold text-gray-800 mt-1">

                                    {query}

                                </h2>

                            </div>


                            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">

                                Version {version}

                            </div>

                        </div>



                        {/* ======================================
                            REPORT ANALYTICS
                        ====================================== */}

                        {(qualityScore !== undefined ||
                            qualityText ||
                            executionTime) && (

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">


                                {/* Quality Score */}

                                <div className="bg-sky-50 rounded-xl p-4">

                                    <p className="text-sm text-gray-500">

                                        Quality Score

                                    </p>


                                    <p className="text-2xl font-bold text-gray-800 mt-1">

                                        {qualityScore ??
                                            "-"}

                                    </p>

                                </div>



                                {/* Quality */}

                                <div className="bg-sky-50 rounded-xl p-4">

                                    <p className="text-sm text-gray-500">

                                        Quality

                                    </p>


                                    <p className="text-lg font-bold text-gray-800 mt-1">

                                        {qualityText ||
                                            "-"}

                                    </p>

                                </div>



                                {/* Execution Time */}

                                <div className="bg-sky-50 rounded-xl p-4">

                                    <p className="text-sm text-gray-500">

                                        Execution Time

                                    </p>


                                    <p className="text-lg font-bold text-gray-800 mt-1">

                                        {executionTime
                                            ? `${executionTime}s`
                                            : "-"}

                                    </p>

                                </div>

                            </div>

                        )}



                        {/* ======================================
                            DOWNLOAD SECTION
                        ====================================== */}

                        <div className="mt-4">


                            <div className="mb-4">

                                <h3 className="text-xl font-bold text-gray-800">

                                    Download Report

                                </h3>


                                <p className="text-gray-500 text-sm mt-1">

                                    Download your generated research
                                    report in your preferred format.

                                </p>

                            </div>



                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                                {/* ==================================
                                    PDF
                                ================================== */}

                                <button
                                    type="button"
                                    onClick={
                                        handleDownloadPDF
                                    }
                                    disabled={
                                        downloading !== "" ||
                                        !pdfFile
                                    }
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-5
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        text-white
                                        bg-red-500
                                        hover:bg-red-600
                                        disabled:bg-gray-300
                                        disabled:cursor-not-allowed
                                        transition
                                    "
                                >

                                    <FiDownload
                                        size={18}
                                    />

                                    {downloading ===
                                    "pdf"
                                        ? "Downloading PDF..."
                                        : "Download PDF"}

                                </button>



                                {/* ==================================
                                    DOCX
                                ================================== */}

                                <button
                                    type="button"
                                    onClick={
                                        handleDownloadDOCX
                                    }
                                    disabled={
                                        downloading !== "" ||
                                        !docxFile
                                    }
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-5
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        text-white
                                        bg-blue-500
                                        hover:bg-blue-600
                                        disabled:bg-gray-300
                                        disabled:cursor-not-allowed
                                        transition
                                    "
                                >

                                    <FiDownload
                                        size={18}
                                    />

                                    {downloading ===
                                    "docx"
                                        ? "Downloading DOCX..."
                                        : "Download DOCX"}

                                </button>



                                {/* ==================================
                                    MARKDOWN
                                ================================== */}

                                <button
                                    type="button"
                                    onClick={
                                        handleDownloadMarkdown
                                    }
                                    disabled={
                                        downloading !== "" ||
                                        !markdownFile
                                    }
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-5
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        text-white
                                        bg-sky-500
                                        hover:bg-sky-600
                                        disabled:bg-gray-300
                                        disabled:cursor-not-allowed
                                        transition
                                    "
                                >

                                    <FiDownload
                                        size={18}
                                    />

                                    {downloading ===
                                    "markdown"
                                        ? "Downloading Markdown..."
                                        : "Download Markdown"}

                                </button>

                            </div>



                            {/* ==================================
                                STATUS
                            ================================== */}

                            {!downloading &&
                                !downloadSuccess && (

                                    <p className="text-sm text-green-600 mt-4">

                                        ✓ Report files are ready
                                        for download.

                                    </p>

                                )}

                        </div>



                        {/* ======================================
                            FILE AVAILABILITY
                        ====================================== */}

                        <div className="mt-6 pt-5 border-t border-gray-100">

                            <div className="flex flex-wrap gap-3 text-sm">

                                {pdfFile && (

                                    <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg">

                                        PDF Available

                                    </span>

                                )}


                                {docxFile && (

                                    <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg">

                                        DOCX Available

                                    </span>

                                )}


                                {markdownFile && (

                                    <span className="bg-sky-50 text-sky-600 px-3 py-1.5 rounded-lg">

                                        Markdown Available

                                    </span>

                                )}

                            </div>

                        </div>



                        {/* ======================================
                            SUCCESS
                        ====================================== */}

                        {downloadSuccess && (

                            <div className="mt-5 flex items-center gap-2 text-green-600 font-semibold">

                                <FiCheckCircle />

                                {downloadSuccess}

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>

    );
}


export default GenerateReport;