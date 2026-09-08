import { useState } from "react";

import {
    FiFileText,
    FiDownload,
    FiCheckCircle,
    FiClock,
    FiSearch,
    FiUser,
    FiBookOpen,
    FiLayers,
    FiZap,
    FiAward,
} from "react-icons/fi";

import {
    generateReport,
    downloadPDF,
    downloadDOCX,
    downloadMarkdown,
} from "../services/reportService";


function GenerateReport() {

    // ==========================================================
    // FORM STATE
    // ==========================================================

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


    // ==========================================================
    // REPORT STATE
    // ==========================================================

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


    // ==========================================================
    // GENERATE REPORT
    // ==========================================================

    const handleGenerateReport = async (event) => {

        event.preventDefault();

        if (!query.trim()) {
            setError("Please enter a research topic.");
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


    // ==========================================================
    // GET REPORT DATA
    // ==========================================================

    const getReportData = () => {

        if (!generatedReport) {
            return null;
        }

        return (
            generatedReport?.data ||
            generatedReport
        );
    };


    // ==========================================================
    // GET FILE PATH
    // ==========================================================

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


    // ==========================================================
    // SAVE DOWNLOADED BLOB
    // ==========================================================

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


    // ==========================================================
    // DOWNLOAD PDF
    // ==========================================================

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

            const response =
                await downloadPDF(
                    filePath
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


    // ==========================================================
    // DOWNLOAD DOCX
    // ==========================================================

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

            const response =
                await downloadDOCX(
                    filePath
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


    // ==========================================================
    // DOWNLOAD MARKDOWN
    // ==========================================================

    const handleDownloadMarkdown = async () => {

        const filePath =
            getFilePath("markdown");

        if (!filePath) {

            setError(
                "Markdown file is not available."
            );

            return;
        }

        try {

            setDownloading("markdown");

            setError("");

            setDownloadSuccess("");

            const response =
                await downloadMarkdown(
                    filePath
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


    // ==========================================================
    // REPORT INFORMATION
    // ==========================================================

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
        getFilePath("markdown");


    // ==========================================================
    // UI
    // ==========================================================

    return (

        <div
            className="
                page-enter
                relative
                min-h-screen
                pb-10
            "
        >

            <div className="mx-auto w-full max-w-[1250px]">


                {/* =================================================
                    HERO
                ================================================= */}

                <section
                    className="
                        relative
                        mb-7
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-slate-200/80
                        bg-white
                        p-7
                        shadow-[0_20px_60px_rgba(15,23,42,0.06)]
                        dark:border-slate-800
                        dark:bg-[#071126]
                        dark:shadow-[0_25px_70px_rgba(0,0,0,0.28)]
                        md:p-9
                    "
                >

                    {/* Background glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-32
                            h-80
                            w-80
                            rounded-full
                            bg-sky-400/15
                            blur-[100px]
                            dark:bg-sky-500/15
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-32
                            left-1/3
                            h-72
                            w-72
                            rounded-full
                            bg-violet-500/10
                            blur-[100px]
                        "
                    />


                    <div
                        className="
                            relative
                            z-10
                            flex
                            flex-col
                            gap-8
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        <div className="max-w-3xl">

                            {/* Badge */}

                            <div
                                className="
                                    mb-5
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-sky-200
                                    bg-sky-50
                                    px-3.5
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    text-sky-600
                                    dark:border-sky-500/20
                                    dark:bg-sky-500/10
                                    dark:text-sky-300
                                "
                            >

                                <FiZap size={13} />

                                AI-Powered Research Generation

                            </div>


                            <h1
                                className="
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-slate-900
                                    dark:text-white
                                    sm:text-4xl
                                "
                            >
                                Generate Research Report
                            </h1>


                            <p
                                className="
                                    mt-3
                                    max-w-2xl
                                    text-sm
                                    leading-7
                                    text-slate-500
                                    dark:text-slate-400
                                    sm:text-base
                                "
                            >
                                Transform a research topic into a
                                structured, intelligent report using
                                the ResearchMind AI pipeline.
                            </p>


                            {/* Mini feature pills */}

                            <div
                                className="
                                    mt-6
                                    flex
                                    flex-wrap
                                    gap-2
                                "
                            >

                                <FeaturePill
                                    icon={<FiSearch />}
                                    text="Paper Search"
                                />

                                <FeaturePill
                                    icon={<FiBookOpen />}
                                    text="Paper Analysis"
                                />

                                <FeaturePill
                                    icon={<FiLayers />}
                                    text="Research Gaps"
                                />

                                <FeaturePill
                                    icon={<FiAward />}
                                    text="Report Generation"
                                />

                            </div>

                        </div>


                        {/* AI visual */}

                        <div
                            className="
                                hidden
                                h-36
                                w-36
                                shrink-0
                                items-center
                                justify-center
                                rounded-[30px]
                                border
                                border-sky-200/70
                                bg-gradient-to-br
                                from-sky-50
                                via-white
                                to-violet-50
                                shadow-xl
                                shadow-sky-500/10
                                lg:flex
                                dark:border-sky-500/20
                                dark:from-sky-500/10
                                dark:via-slate-900
                                dark:to-violet-500/10
                            "
                        >

                            <div
                                className="
                                    float-animation
                                    flex
                                    h-24
                                    w-24
                                    items-center
                                    justify-center
                                    rounded-3xl
                                    bg-gradient-to-br
                                    from-sky-400
                                    via-blue-500
                                    to-violet-600
                                    shadow-2xl
                                    shadow-blue-500/30
                                "
                            >
                                <FiFileText
                                    size={42}
                                    className="text-white"
                                />
                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    ALERTS
                ================================================= */}

                {error && (

                    <div
                        className="
                            mb-6
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                            p-4
                            text-sm
                            text-red-700
                            shadow-sm
                            dark:border-red-900/60
                            dark:bg-red-950/30
                            dark:text-red-300
                        "
                    >

                        <div
                            className="
                                mt-0.5
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-red-100
                                dark:bg-red-900/40
                            "
                        >
                            !
                        </div>

                        <div>

                            <p className="font-semibold">
                                Something went wrong
                            </p>

                            <p className="mt-0.5 text-xs opacity-80">
                                {error}
                            </p>

                        </div>

                    </div>

                )}


                {downloadSuccess && (

                    <div
                        className="
                            mb-6
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-emerald-200
                            bg-emerald-50
                            p-4
                            text-sm
                            text-emerald-700
                            shadow-sm
                            dark:border-emerald-900/60
                            dark:bg-emerald-950/30
                            dark:text-emerald-300
                        "
                    >

                        <FiCheckCircle size={20} />

                        <div>

                            <p className="font-semibold">
                                Download successful
                            </p>

                            <p className="text-xs opacity-80">
                                {downloadSuccess}
                            </p>

                        </div>

                    </div>

                )}


                {/* =================================================
                    FORM CARD
                ================================================= */}

                <section
                    className="
                        mb-8
                        overflow-hidden
                        rounded-[26px]
                        border
                        border-slate-200/80
                        bg-white
                        shadow-[0_15px_50px_rgba(15,23,42,0.05)]
                        dark:border-slate-800
                        dark:bg-[#071126]/90
                    "
                >

                    {/* Card header */}

                    <div
                        className="
                            border-b
                            border-slate-100
                            bg-gradient-to-r
                            from-slate-50
                            to-sky-50/40
                            px-6
                            py-5
                            dark:border-slate-800
                            dark:from-slate-900/60
                            dark:to-sky-500/5
                            md:px-7
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gradient-to-br
                                    from-sky-500
                                    to-violet-600
                                    text-white
                                    shadow-lg
                                    shadow-blue-500/20
                                "
                            >
                                <FiFileText size={19} />
                            </div>

                            <div>

                                <h2
                                    className="
                                        text-base
                                        font-bold
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    Research Configuration
                                </h2>

                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        text-slate-400
                                    "
                                >
                                    Configure how your research report
                                    should be generated.
                                </p>

                            </div>

                        </div>

                    </div>


                    <form
                        onSubmit={handleGenerateReport}
                        className="p-6 md:p-7"
                    >

                        {/* =================================================
                            TOPIC
                        ================================================= */}

                        <div className="mb-7">

                            <label
                                className="
                                    mb-2.5
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    text-slate-800
                                    dark:text-slate-100
                                "
                            >

                                <FiSearch
                                    className="text-sky-500"
                                    size={16}
                                />

                                Research Topic

                                <span className="text-red-500">
                                    *
                                </span>

                            </label>


                            <div className="relative">

                                <input
                                    type="text"
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter a research topic, e.g. Agentic AI"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        px-4
                                        py-3.5
                                        text-sm
                                        text-slate-800
                                        placeholder-slate-400
                                        outline-none
                                        transition
                                        focus:border-sky-400
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-sky-500/10
                                        dark:border-slate-700
                                        dark:bg-slate-900/70
                                        dark:text-white
                                        dark:placeholder-slate-500
                                        dark:focus:border-sky-500
                                        dark:focus:bg-slate-900
                                    "
                                />

                            </div>

                            <p
                                className="
                                    mt-2
                                    text-xs
                                    text-slate-400
                                "
                            >
                                Enter a topic you want ResearchMind AI
                                to investigate and analyze.
                            </p>

                        </div>


                        {/* =================================================
                            PERSONAL DETAILS
                        ================================================= */}

                        <div className="mb-7">

                            <SectionTitle
                                icon={<FiUser />}
                                title="Researcher Profile"
                                description="Used to personalize the generated explanation."
                            />


                            <div
                                className="
                                    mt-5
                                    grid
                                    grid-cols-1
                                    gap-5
                                    md:grid-cols-2
                                "
                            >

                                <FormField label="Name">

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(event) =>
                                            setName(
                                                event.target.value
                                            )
                                        }
                                        className={inputClass}
                                    />

                                </FormField>


                                <FormField label="Age">

                                    <input
                                        type="number"
                                        min="1"
                                        value={age}
                                        onChange={(event) =>
                                            setAge(
                                                event.target.value
                                            )
                                        }
                                        className={inputClass}
                                    />

                                </FormField>


                                <FormField label="Qualification">

                                    <input
                                        type="text"
                                        value={qualification}
                                        onChange={(event) =>
                                            setQualification(
                                                event.target.value
                                            )
                                        }
                                        className={inputClass}
                                    />

                                </FormField>


                                <FormField label="Experience Level">

                                    <select
                                        value={experienceLevel}
                                        onChange={(event) =>
                                            setExperienceLevel(
                                                event.target.value
                                            )
                                        }
                                        className={inputClass}
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

                                </FormField>

                            </div>

                        </div>


                        {/* =================================================
                            REPORT PREFERENCES
                        ================================================= */}

                        <div>

                            <SectionTitle
                                icon={<FiLayers />}
                                title="Report Preferences"
                                description="Choose the explanation style and report format."
                            />


                            <div
                                className="
                                    mt-5
                                    grid
                                    grid-cols-1
                                    gap-5
                                    md:grid-cols-2
                                "
                            >

                                <FormField label="Explanation Style">

                                    <select
                                        value={explanationStyle}
                                        onChange={(event) =>
                                            setExplanationStyle(
                                                event.target.value
                                            )
                                        }
                                        className={inputClass}
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

                                </FormField>


                                <FormField label="Report Template">

                                    <select
                                        value={template}
                                        onChange={(event) =>
                                            setTemplate(
                                                event.target.value
                                            )
                                        }
                                        className={inputClass}
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

                                </FormField>

                            </div>

                        </div>


                        {/* =================================================
                            GENERATE BUTTON
                        ================================================= */}

                        <div
                            className="
                                mt-8
                                flex
                                flex-col
                                gap-4
                                border-t
                                border-slate-100
                                pt-7
                                dark:border-slate-800
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        dark:text-slate-200
                                    "
                                >
                                    Ready to research?
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-slate-400
                                    "
                                >
                                    Your report will be generated
                                    using the complete AI pipeline.
                                </p>

                            </div>


                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2.5
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-sky-500
                                    via-blue-500
                                    to-violet-600
                                    px-7
                                    py-3.5
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-blue-500/20
                                    transition
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:shadow-xl
                                    hover:shadow-blue-500/30
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    disabled:hover:translate-y-0
                                "
                            >

                                {loading ? (

                                    <>
                                        <span
                                            className="
                                                h-4
                                                w-4
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-white/30
                                                border-t-white
                                            "
                                        />

                                        Generating Report...

                                    </>

                                ) : (

                                    <>
                                        <FiZap size={17} />

                                        Generate Report

                                        <span
                                            className="
                                                transition
                                                group-hover:translate-x-1
                                            "
                                        >
                                            →
                                        </span>
                                    </>

                                )}

                            </button>

                        </div>

                    </form>

                </section>


                {/* =================================================
                    GENERATED REPORT
                ================================================= */}

                {generatedReport && (

                    <section
                        className="
                            overflow-hidden
                            rounded-[26px]
                            border
                            border-slate-200/80
                            bg-white
                            shadow-[0_20px_60px_rgba(15,23,42,0.07)]
                            dark:border-slate-800
                            dark:bg-[#071126]/90
                        "
                    >

                        {/* Report header */}

                        <div
                            className="
                                relative
                                overflow-hidden
                                border-b
                                border-slate-100
                                bg-gradient-to-r
                                from-emerald-50
                                via-white
                                to-sky-50
                                px-6
                                py-6
                                dark:border-slate-800
                                dark:from-emerald-500/10
                                dark:via-slate-900
                                dark:to-sky-500/10
                                md:px-7
                            "
                        >

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -right-20
                                    -top-20
                                    h-48
                                    w-48
                                    rounded-full
                                    bg-emerald-400/10
                                    blur-3xl
                                "
                            />

                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    flex-col
                                    gap-5
                                    md:flex-row
                                    md:items-center
                                    md:justify-between
                                "
                            >

                                <div>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-emerald-600
                                            dark:text-emerald-400
                                        "
                                    >

                                        <FiCheckCircle />

                                        Report Generated Successfully

                                    </div>


                                    <h2
                                        className="
                                            mt-2
                                            break-words
                                            text-2xl
                                            font-bold
                                            tracking-tight
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        {query}
                                    </h2>

                                </div>


                                <div
                                    className="
                                        inline-flex
                                        w-fit
                                        items-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-emerald-200
                                        bg-emerald-100
                                        px-4
                                        py-2
                                        text-sm
                                        font-bold
                                        text-emerald-700
                                        dark:border-emerald-500/20
                                        dark:bg-emerald-500/10
                                        dark:text-emerald-400
                                    "
                                >

                                    <FiAward size={16} />

                                    Version {version}

                                </div>

                            </div>

                        </div>


                        <div className="p-6 md:p-7">


                            {/* =================================================
                                ANALYTICS
                            ================================================= */}

                            {(qualityScore !== undefined ||
                                qualityText ||
                                executionTime) && (

                                <div
                                    className="
                                        mb-8
                                        grid
                                        grid-cols-1
                                        gap-4
                                        md:grid-cols-3
                                    "
                                >

                                    <AnalyticsCard
                                        title="Quality Score"
                                        value={
                                            qualityScore ??
                                            "-"
                                        }
                                        icon={<FiAward />}
                                    />

                                    <AnalyticsCard
                                        title="Quality"
                                        value={
                                            qualityText ||
                                            "-"
                                        }
                                        icon={<FiCheckCircle />}
                                    />

                                    <AnalyticsCard
                                        title="Execution Time"
                                        value={
                                            executionTime
                                                ? `${executionTime}s`
                                                : "-"
                                        }
                                        icon={<FiClock />}
                                    />

                                </div>

                            )}


                            {/* =================================================
                                DOWNLOAD
                            ================================================= */}

                            <div>

                                <div className="mb-5">

                                    <h3
                                        className="
                                            text-lg
                                            font-bold
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        Download Report
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-slate-400
                                        "
                                    >
                                        Choose your preferred format.
                                    </p>

                                </div>


                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-4
                                        md:grid-cols-3
                                    "
                                >

                                    <DownloadCard
                                        label="PDF"
                                        description="Portable document"
                                        icon={<FiDownload />}
                                        available={!!pdfFile}
                                        loading={
                                            downloading === "pdf"
                                        }
                                        onClick={
                                            handleDownloadPDF
                                        }
                                        variant="red"
                                    />

                                    <DownloadCard
                                        label="DOCX"
                                        description="Editable document"
                                        icon={<FiDownload />}
                                        available={!!docxFile}
                                        loading={
                                            downloading === "docx"
                                        }
                                        onClick={
                                            handleDownloadDOCX
                                        }
                                        variant="blue"
                                    />

                                    <DownloadCard
                                        label="Markdown"
                                        description="Plain text format"
                                        icon={<FiDownload />}
                                        available={!!markdownFile}
                                        loading={
                                            downloading === "markdown"
                                        }
                                        onClick={
                                            handleDownloadMarkdown
                                        }
                                        variant="sky"
                                    />

                                </div>


                                {/* File status */}

                                <div
                                    className="
                                        mt-6
                                        flex
                                        flex-wrap
                                        gap-2
                                        border-t
                                        border-slate-100
                                        pt-5
                                        dark:border-slate-800
                                    "
                                >

                                    {pdfFile && (
                                        <StatusPill
                                            text="PDF Available"
                                            variant="red"
                                        />
                                    )}

                                    {docxFile && (
                                        <StatusPill
                                            text="DOCX Available"
                                            variant="blue"
                                        />
                                    )}

                                    {markdownFile && (
                                        <StatusPill
                                            text="Markdown Available"
                                            variant="sky"
                                        />
                                    )}

                                </div>


                                {!downloading &&
                                    !downloadSuccess && (

                                    <div
                                        className="
                                            mt-4
                                            flex
                                            items-center
                                            gap-2
                                            text-xs
                                            font-medium
                                            text-emerald-600
                                            dark:text-emerald-400
                                        "
                                    >

                                        <FiCheckCircle />

                                        Report files are ready
                                        for download.

                                    </div>

                                )}

                            </div>

                        </div>

                    </section>

                )}

            </div>

        </div>
    );
}


/* =============================================================
   FEATURE PILL
============================================================= */

function FeaturePill({
    icon,
    text,
}) {
    return (
        <div
            className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-slate-50
                px-3
                py-2
                text-xs
                font-medium
                text-slate-500
                dark:border-slate-700
                dark:bg-slate-900/60
                dark:text-slate-400
            "
        >

            <span className="text-sky-500">
                {icon}
            </span>

            {text}

        </div>
    );
}


/* =============================================================
   SECTION TITLE
============================================================= */

function SectionTitle({
    icon,
    title,
    description,
}) {
    return (
        <div className="flex items-start gap-3">

            <div
                className="
                    mt-0.5
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-sky-50
                    text-sky-500
                    dark:bg-sky-500/10
                    dark:text-sky-400
                "
            >
                {icon}
            </div>

            <div>

                <h3
                    className="
                        text-sm
                        font-bold
                        text-slate-800
                        dark:text-slate-100
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-1
                        text-xs
                        text-slate-400
                    "
                >
                    {description}
                </p>

            </div>

        </div>
    );
}


/* =============================================================
   FORM FIELD
============================================================= */

function FormField({
    label,
    children,
}) {
    return (
        <div>

            <label
                className="
                    mb-2
                    block
                    text-xs
                    font-semibold
                    text-slate-600
                    dark:text-slate-300
                "
            >
                {label}
            </label>

            {children}

        </div>
    );
}


/* =============================================================
   ANALYTICS CARD
============================================================= */

function AnalyticsCard({
    title,
    value,
    icon,
}) {
    return (
        <div
            className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-slate-50/70
                p-5
                transition
                hover:-translate-y-0.5
                hover:border-sky-200
                dark:border-slate-800
                dark:bg-slate-900/60
                dark:hover:border-sky-500/20
            "
        >

            <div className="flex items-start justify-between">

                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-sky-50
                        text-sky-500
                        dark:bg-sky-500/10
                        dark:text-sky-400
                    "
                >
                    {icon}
                </div>

            </div>

            <p
                className="
                    mt-4
                    text-xs
                    font-medium
                    text-slate-400
                "
            >
                {title}
            </p>

            <p
                className="
                    mt-1
                    text-xl
                    font-bold
                    text-slate-900
                    dark:text-white
                "
            >
                {value}
            </p>

        </div>
    );
}


/* =============================================================
   DOWNLOAD CARD
============================================================= */

function DownloadCard({
    label,
    description,
    icon,
    available,
    loading,
    onClick,
    variant,
}) {

    const variants = {

        red: `
            border-red-100
            hover:border-red-300
            hover:bg-red-50
            text-red-500
            dark:border-red-900/40
            dark:hover:border-red-500/30
            dark:hover:bg-red-500/5
        `,

        blue: `
            border-blue-100
            hover:border-blue-300
            hover:bg-blue-50
            text-blue-500
            dark:border-blue-900/40
            dark:hover:border-blue-500/30
            dark:hover:bg-blue-500/5
        `,

        sky: `
            border-sky-100
            hover:border-sky-300
            hover:bg-sky-50
            text-sky-500
            dark:border-sky-900/40
            dark:hover:border-sky-500/30
            dark:hover:bg-sky-500/5
        `,
    };


    return (
        <button
            type="button"
            onClick={onClick}
            disabled={
                !available ||
                downloadingIsBusy(loading)
            }
            className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                bg-white
                p-5
                text-left
                transition
                duration-200
                hover:-translate-y-1
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:bg-slate-900/60
                ${variants[variant]}
            `}
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-50
                        dark:bg-slate-800
                    "
                >
                    {loading ? (
                        <span
                            className="
                                h-4
                                w-4
                                animate-spin
                                rounded-full
                                border-2
                                border-slate-300
                                border-t-current
                            "
                        />
                    ) : (
                        icon
                    )}
                </div>


                <FiDownload
                    size={17}
                    className="
                        opacity-30
                        transition
                        group-hover:opacity-100
                    "
                />

            </div>


            <p
                className="
                    mt-5
                    text-sm
                    font-bold
                    text-slate-800
                    dark:text-slate-100
                "
            >
                {loading
                    ? `Downloading ${label}...`
                    : `Download ${label}`}
            </p>


            <p
                className="
                    mt-1
                    text-xs
                    text-slate-400
                "
            >
                {available
                    ? description
                    : `${label} unavailable`}
            </p>

        </button>
    );
}


/* =============================================================
   STATUS PILL
============================================================= */

function StatusPill({
    text,
    variant,
}) {

    const classes = {

        red: `
            bg-red-50
            text-red-600
            dark:bg-red-500/10
            dark:text-red-400
        `,

        blue: `
            bg-blue-50
            text-blue-600
            dark:bg-blue-500/10
            dark:text-blue-400
        `,

        sky: `
            bg-sky-50
            text-sky-600
            dark:bg-sky-500/10
            dark:text-sky-400
        `,
    };


    return (
        <span
            className={`
                inline-flex
                items-center
                gap-1.5
                rounded-lg
                px-3
                py-1.5
                text-xs
                font-semibold
                ${classes[variant]}
            `}
        >

            <FiCheckCircle size={12} />

            {text}

        </span>
    );
}


/* =============================================================
   INPUT CLASS
============================================================= */

const inputClass = `
    w-full
    rounded-xl
    border
    border-slate-200
    bg-slate-50
    px-4
    py-3
    text-sm
    text-slate-800
    outline-none
    transition
    focus:border-sky-400
    focus:bg-white
    focus:ring-4
    focus:ring-sky-500/10
    dark:border-slate-700
    dark:bg-slate-900/70
    dark:text-white
    dark:focus:border-sky-500
    dark:focus:bg-slate-900
`;


/* =============================================================
   HELPER
============================================================= */

function downloadingIsBusy(isLoading) {
    return Boolean(isLoading);
}


export default GenerateReport;