import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiFileText,
    FiEye,
    FiRefreshCw,
    FiClock,
    FiCalendar,
    FiLayers,
    FiArrowUpRight,
    FiPlus,
    FiSearch,
    FiCheckCircle,
} from "react-icons/fi";

import { getReportHistory } from "../services/reportHistoryService";


function ReportHistory() {

    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================================
    // LOAD REPORTS
    // ==========================================================

    async function loadReports() {

        try {

            setLoading(true);
            setError("");

            const response =
                await getReportHistory();

            console.log(
                "History response:",
                response
            );


            let history = [];


            if (Array.isArray(response)) {

                history = response;

            } else if (
                Array.isArray(response?.history)
            ) {

                history = response.history;

            } else if (
                Array.isArray(response?.reports)
            ) {

                history = response.reports;

            } else if (
                Array.isArray(response?.results)
            ) {

                history = response.results;

            } else if (
                Array.isArray(response?.data)
            ) {

                history = response.data;

            } else if (
                Array.isArray(
                    response?.data?.history
                )
            ) {

                history =
                    response.data.history;

            } else if (
                Array.isArray(
                    response?.data?.reports
                )
            ) {

                history =
                    response.data.reports;

            } else if (
                Array.isArray(
                    response?.result?.history
                )
            ) {

                history =
                    response.result.history;

            } else if (
                Array.isArray(
                    response?.result?.reports
                )
            ) {

                history =
                    response.result.reports;
            }


            console.log(
                "Parsed history:",
                history
            );


            setReports(
                Array.isArray(history)
                    ? history
                    : []
            );

        } catch (err) {

            console.error(
                "Report history error:",
                err
            );


            setError(
                err.response?.data?.detail ||
                err.response?.data?.message ||
                err.userMessage ||
                err.message ||
                "Failed to load report history."
            );

        } finally {

            setLoading(false);

        }
    }


    // ==========================================================
    // INITIAL LOAD
    // ==========================================================

    useEffect(() => {

        loadReports();

    }, []);


    // ==========================================================
    // VIEW REPORT
    // ==========================================================

    function handleViewReport(report) {

        navigate(
            "/report-viewer",
            {
                state: {
                    report: report,
                },
            }
        );
    }


    // ==========================================================
    // GET TOPIC
    // ==========================================================

    const getReportTopic = (report) => {

        return (
            report?.research_topic ||
            report?.researchTopic ||
            report?.query ||
            report?.topic ||
            report?.search_query ||
            report?.searchQuery ||
            report?.title ||
            report?.report_title ||
            "Research Report"
        );
    };


    // ==========================================================
    // GET DATE
    // ==========================================================

    const getReportDate = (report) => {

        return (
            report?.generated_at ||
            report?.generatedAt ||
            report?.created_at ||
            report?.createdAt ||
            report?.timestamp ||
            report?.date ||
            report?.created ||
            "-"
        );
    };


    // ==========================================================
    // GET VERSION
    // ==========================================================

    const getReportVersion = (report) => {

        return (
            report?.version ||
            report?.report_version ||
            report?.reportVersion ||
            1
        );
    };


    // ==========================================================
    // FORMAT DATE
    // ==========================================================

    const formatDate = (value) => {

        if (!value || value === "-") {
            return "-";
        }

        try {

            const date =
                new Date(value);

            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {
                return value;
            }

            return date.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }
            );

        } catch {

            return value;

        }
    };


    // ==========================================================
    // PAGE
    // ==========================================================

    return (

        <div
            className="
                page-enter
                min-h-screen
                pb-10
            "
        >

            <div className="mx-auto w-full max-w-[1400px]">


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
                        dark:shadow-[0_25px_80px_rgba(0,0,0,0.28)]
                        md:p-9
                    "
                >

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-24
                            -top-28
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
                            gap-7
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        <div>

                            <div
                                className="
                                    mb-4
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

                                <FiLayers size={13} />

                                Research Workspace

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
                                Report History
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
                                Browse, review and revisit your
                                previously generated research reports
                                from one intelligent workspace.
                            </p>


                            <div
                                className="
                                    mt-6
                                    flex
                                    flex-wrap
                                    gap-2
                                "
                            >

                                <InfoPill
                                    icon={<FiFileText />}
                                    text={`${reports.length} Reports`}
                                />

                                <InfoPill
                                    icon={<FiCheckCircle />}
                                    text="Saved Research"
                                />

                            </div>

                        </div>


                        <div className="flex flex-wrap gap-3">

                            <button
                                type="button"
                                onClick={loadReports}
                                disabled={loading}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2.5
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white/80
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    shadow-sm
                                    transition
                                    hover:-translate-y-0.5
                                    hover:border-sky-300
                                    hover:bg-sky-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    dark:border-slate-700
                                    dark:bg-slate-900/70
                                    dark:text-slate-200
                                    dark:hover:border-sky-500/30
                                    dark:hover:bg-sky-500/10
                                "
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


                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/generate-report"
                                    )
                                }
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2.5
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-sky-500
                                    via-blue-500
                                    to-violet-600
                                    px-5
                                    py-3
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-blue-500/20
                                    transition
                                    hover:-translate-y-0.5
                                    hover:shadow-xl
                                    hover:shadow-blue-500/30
                                "
                            >

                                <FiPlus size={17} />

                                New Report

                            </button>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}

                {!loading && !error && reports.length > 0 && (

                    <section
                        className="
                            mb-7
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >

                        <SummaryCard
                            icon={<FiFileText />}
                            title="Total Reports"
                            value={reports.length}
                            description="Generated research reports"
                        />

                        <SummaryCard
                            icon={<FiClock />}
                            title="Latest Activity"
                            value={
                                formatDate(
                                    getReportDate(
                                        reports[reports.length - 1]
                                    )
                                )
                            }
                            description="Most recent report"
                        />

                        <SummaryCard
                            icon={<FiLayers />}
                            title="Workspace"
                            value="Active"
                            description="Research history available"
                        />

                    </section>

                )}


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <LoadingState />

                )}


                {/* =================================================
                    ERROR
                ================================================= */}

                {!loading && error && (

                    <div
                        className="
                            rounded-[26px]
                            border
                            border-red-200
                            bg-white
                            p-10
                            text-center
                            shadow-[0_15px_50px_rgba(15,23,42,0.05)]
                            dark:border-red-900/50
                            dark:bg-[#071126]
                        "
                    >

                        <div
                            className="
                                mx-auto
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-red-50
                                text-red-500
                                dark:bg-red-500/10
                                dark:text-red-400
                            "
                        >
                            !
                        </div>


                        <h2
                            className="
                                mt-4
                                text-lg
                                font-bold
                                text-slate-900
                                dark:text-white
                            "
                        >
                            Unable to load report history
                        </h2>


                        <p
                            className="
                                mx-auto
                                mt-2
                                max-w-lg
                                text-sm
                                text-red-500
                                dark:text-red-400
                            "
                        >
                            {error}
                        </p>


                        <button
                            type="button"
                            onClick={loadReports}
                            className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-sky-500
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-sky-600
                            "
                        >

                            <FiRefreshCw />

                            Try Again

                        </button>

                    </div>

                )}


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {!loading &&
                    !error &&
                    reports.length === 0 && (

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[26px]
                            border
                            border-slate-200/80
                            bg-white
                            p-12
                            text-center
                            shadow-[0_15px_50px_rgba(15,23,42,0.05)]
                            dark:border-slate-800
                            dark:bg-[#071126]
                        "
                    >

                        <div
                            className="
                                pointer-events-none
                                absolute
                                left-1/2
                                top-0
                                h-56
                                w-56
                                -translate-x-1/2
                                rounded-full
                                bg-sky-400/10
                                blur-3xl
                            "
                        />


                        <div
                            className="
                                relative
                                z-10
                                mx-auto
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-3xl
                                bg-gradient-to-br
                                from-sky-50
                                to-violet-50
                                text-sky-500
                                shadow-sm
                                dark:from-sky-500/10
                                dark:to-violet-500/10
                                dark:text-sky-400
                            "
                        >
                            <FiFileText size={34} />
                        </div>


                        <h2
                            className="
                                relative
                                z-10
                                mt-6
                                text-xl
                                font-bold
                                text-slate-900
                                dark:text-white
                            "
                        >
                            No Reports Found
                        </h2>


                        <p
                            className="
                                relative
                                z-10
                                mx-auto
                                mt-2
                                max-w-md
                                text-sm
                                leading-6
                                text-slate-400
                            "
                        >
                            Your generated research reports will
                            appear here. Start by creating your first
                            AI-powered research report.
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/generate-report"
                                )
                            }
                            className="
                                relative
                                z-10
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-sky-500
                                to-violet-600
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                shadow-blue-500/20
                                transition
                                hover:-translate-y-0.5
                            "
                        >

                            <FiPlus />

                            Generate Your First Report

                        </button>

                    </div>

                )}


                {/* =================================================
                    REPORT TABLE
                ================================================= */}

                {!loading &&
                    !error &&
                    reports.length > 0 && (

                    <section
                        className="
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

                        {/* Table Header */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-4
                                border-b
                                border-slate-100
                                px-6
                                py-5
                                md:flex-row
                                md:items-center
                                md:justify-between
                                dark:border-slate-800
                            "
                        >

                            <div>

                                <h2
                                    className="
                                        text-base
                                        font-bold
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    Generated Reports
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-slate-400
                                    "
                                >
                                    Select a report to open the
                                    complete research output.
                                </p>

                            </div>


                            <div
                                className="
                                    inline-flex
                                    w-fit
                                    items-center
                                    gap-2
                                    rounded-lg
                                    bg-slate-50
                                    px-3
                                    py-2
                                    text-xs
                                    font-medium
                                    text-slate-500
                                    dark:bg-slate-900
                                    dark:text-slate-400
                                "
                            >

                                <FiSearch size={13} />

                                {reports.length} results

                            </div>

                        </div>


                        {/* Desktop Table */}

                        <div className="hidden overflow-x-auto md:block">

                            <table className="w-full">

                                <thead>

                                    <tr
                                        className="
                                            border-b
                                            border-slate-100
                                            bg-slate-50/80
                                            dark:border-slate-800
                                            dark:bg-slate-900/60
                                        "
                                    >

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-left
                                                text-[11px]
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-slate-400
                                            "
                                        >
                                            Research Topic
                                        </th>

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-left
                                                text-[11px]
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-slate-400
                                            "
                                        >
                                            Version
                                        </th>

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-left
                                                text-[11px]
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-slate-400
                                            "
                                        >
                                            Generated
                                        </th>

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-right
                                                text-[11px]
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-slate-400
                                            "
                                        >
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {reports.map(
                                        (report, index) => (

                                        <tr
                                            key={
                                                report?.id ||
                                                report?.report_id ||
                                                report?.reportId ||
                                                `${getReportDate(report)}-${index}`
                                            }
                                            className="
                                                group
                                                border-b
                                                border-slate-100
                                                transition
                                                last:border-b-0
                                                hover:bg-sky-50/50
                                                dark:border-slate-800
                                                dark:hover:bg-slate-900/50
                                            "
                                        >

                                            <td className="px-6 py-5">

                                                <div
                                                    className="
                                                        flex
                                                        min-w-0
                                                        items-center
                                                        gap-3.5
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            h-11
                                                            w-11
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            bg-gradient-to-br
                                                            from-sky-50
                                                            to-indigo-50
                                                            text-sky-600
                                                            dark:from-sky-500/10
                                                            dark:to-indigo-500/10
                                                            dark:text-sky-400
                                                        "
                                                    >
                                                        <FiFileText
                                                            size={18}
                                                        />
                                                    </div>


                                                    <div className="min-w-0">

                                                        <p
                                                            className="
                                                                max-w-[500px]
                                                                truncate
                                                                text-sm
                                                                font-semibold
                                                                text-slate-800
                                                                dark:text-slate-100
                                                            "
                                                        >
                                                            {getReportTopic(
                                                                report
                                                            )}
                                                        </p>

                                                        <p
                                                            className="
                                                                mt-1
                                                                text-xs
                                                                text-slate-400
                                                            "
                                                        >
                                                            Research Report
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            <td className="px-6 py-5">

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        rounded-lg
                                                        bg-slate-100
                                                        px-2.5
                                                        py-1
                                                        text-xs
                                                        font-semibold
                                                        text-slate-600
                                                        dark:bg-slate-800
                                                        dark:text-slate-300
                                                    "
                                                >
                                                    v{getReportVersion(
                                                        report
                                                    )}
                                                </span>

                                            </td>


                                            <td className="px-6 py-5">

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-sm
                                                        text-slate-500
                                                        dark:text-slate-400
                                                    "
                                                >

                                                    <FiCalendar
                                                        size={14}
                                                        className="text-sky-500"
                                                    />

                                                    {formatDate(
                                                        getReportDate(
                                                            report
                                                        )
                                                    )}

                                                </div>

                                            </td>


                                            <td className="px-6 py-5 text-right">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleViewReport(
                                                            report
                                                        )
                                                    }
                                                    className="
                                                        group/button
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        rounded-xl
                                                        bg-gradient-to-r
                                                        from-sky-500
                                                        to-blue-600
                                                        px-4
                                                        py-2.5
                                                        text-xs
                                                        font-bold
                                                        text-white
                                                        shadow-md
                                                        shadow-blue-500/15
                                                        transition
                                                        hover:-translate-y-0.5
                                                        hover:shadow-lg
                                                        hover:shadow-blue-500/20
                                                    "
                                                >

                                                    <FiEye size={14} />

                                                    View Report

                                                    <FiArrowUpRight
                                                        size={13}
                                                        className="
                                                            transition
                                                            group-hover/button:-translate-y-0.5
                                                            group-hover/button:translate-x-0.5
                                                        "
                                                    />

                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>


                        {/* =================================================
                            MOBILE CARDS
                        ================================================= */}

                        <div className="divide-y divide-slate-100 md:hidden dark:divide-slate-800">

                            {reports.map(
                                (report, index) => (

                                <div
                                    key={
                                        report?.id ||
                                        report?.report_id ||
                                        report?.reportId ||
                                        `${getReportDate(report)}-${index}`
                                    }
                                    className="
                                        p-5
                                        transition
                                        hover:bg-slate-50
                                        dark:hover:bg-slate-900/50
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-start
                                            gap-3
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                h-11
                                                w-11
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-sky-50
                                                text-sky-500
                                                dark:bg-sky-500/10
                                                dark:text-sky-400
                                            "
                                        >
                                            <FiFileText />
                                        </div>


                                        <div className="min-w-0 flex-1">

                                            <h3
                                                className="
                                                    break-words
                                                    text-sm
                                                    font-bold
                                                    text-slate-800
                                                    dark:text-white
                                                "
                                            >
                                                {getReportTopic(
                                                    report
                                                )}
                                            </h3>


                                            <div
                                                className="
                                                    mt-2
                                                    flex
                                                    flex-wrap
                                                    gap-3
                                                    text-xs
                                                    text-slate-400
                                                "
                                            >

                                                <span className="inline-flex items-center gap-1.5">

                                                    <FiLayers size={12} />

                                                    v{getReportVersion(
                                                        report
                                                    )}

                                                </span>


                                                <span className="inline-flex items-center gap-1.5">

                                                    <FiCalendar size={12} />

                                                    {formatDate(
                                                        getReportDate(
                                                            report
                                                        )
                                                    )}

                                                </span>

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleViewReport(
                                                        report
                                                    )
                                                }
                                                className="
                                                    mt-4
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    rounded-lg
                                                    bg-sky-500
                                                    px-4
                                                    py-2
                                                    text-xs
                                                    font-bold
                                                    text-white
                                                    transition
                                                    hover:bg-sky-600
                                                "
                                            >

                                                <FiEye size={13} />

                                                View Report

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>

                )}

            </div>

        </div>
    );
}


/* =============================================================
   INFO PILL
============================================================= */

function InfoPill({
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
                font-semibold
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
   SUMMARY CARD
============================================================= */

function SummaryCard({
    icon,
    title,
    value,
    description,
}) {

    return (

        <div
            className="
                group
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-slate-200/80
                bg-white
                p-5
                shadow-[0_10px_35px_rgba(15,23,42,0.05)]
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]
                dark:border-slate-800
                dark:bg-[#071126]/80
            "
        >

            <div
                className="
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    bg-sky-400/10
                    blur-2xl
                    transition
                    group-hover:bg-violet-400/10
                "
            />


            <div className="relative z-10">

                <div
                    className="
                        flex
                        h-11
                        w-11
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


                <p
                    className="
                        mt-5
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
                        truncate
                        text-xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        dark:text-white
                    "
                >
                    {value}
                </p>


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
   LOADING STATE
============================================================= */

function LoadingState() {

    return (

        <div
            className="
                rounded-[26px]
                border
                border-slate-200/80
                bg-white
                p-7
                shadow-[0_15px_50px_rgba(15,23,42,0.05)]
                dark:border-slate-800
                dark:bg-[#071126]
            "
        >

            <div className="mb-6 flex items-center gap-3">

                <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-sky-50
                        dark:bg-sky-500/10
                    "
                >

                    <FiRefreshCw
                        className="
                            animate-spin
                            text-sky-500
                        "
                    />

                </div>


                <div>

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-slate-800
                            dark:text-white
                        "
                    >
                        Loading report history
                    </p>

                    <p
                        className="
                            mt-1
                            text-xs
                            text-slate-400
                        "
                    >
                        Fetching your saved research reports...
                    </p>

                </div>

            </div>


            <div className="space-y-3">

                {[1, 2, 3, 4].map(
                    (item) => (

                    <div
                        key={item}
                        className="
                            flex
                            animate-pulse
                            items-center
                            gap-4
                            rounded-xl
                            bg-slate-50
                            p-4
                            dark:bg-slate-900/60
                        "
                    >

                        <div
                            className="
                                h-11
                                w-11
                                rounded-xl
                                bg-slate-200
                                dark:bg-slate-800
                            "
                        />

                        <div className="flex-1 space-y-2">

                            <div
                                className="
                                    h-3
                                    w-2/3
                                    rounded
                                    bg-slate-200
                                    dark:bg-slate-800
                                "
                            />

                            <div
                                className="
                                    h-2
                                    w-1/3
                                    rounded
                                    bg-slate-100
                                    dark:bg-slate-900
                                "
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}


export default ReportHistory;