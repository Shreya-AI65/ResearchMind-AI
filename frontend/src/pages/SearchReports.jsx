import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiSearch,
    FiFileText,
    FiEye,
    FiArrowUpRight,
    FiClock,
    FiLayers,
    FiPlus,
    FiCheckCircle,
} from "react-icons/fi";

import { searchReports } from "../services/reportSearchService";


function SearchReports() {

    const navigate = useNavigate();

    const [topic, setTopic] = useState("");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState("");


    // ==========================================================
    // SEARCH REPORTS
    // ==========================================================

    const handleSearch = async (event) => {

        event.preventDefault();

        const cleanedTopic = topic.trim();

        if (!cleanedTopic) {

            setError(
                "Please enter a research topic."
            );

            setReports([]);
            setSearched(false);

            return;
        }


        try {

            setLoading(true);
            setError("");
            setSearched(true);


            const response =
                await searchReports(cleanedTopic);


            console.log(
                "Search reports response:",
                response
            );


            let results = [];


            if (Array.isArray(response)) {

                results = response;

            } else if (
                Array.isArray(response?.reports)
            ) {

                results = response.reports;

            } else if (
                Array.isArray(response?.results)
            ) {

                results = response.results;

            } else if (
                Array.isArray(response?.history)
            ) {

                results = response.history;

            } else if (
                Array.isArray(response?.data)
            ) {

                results = response.data;

            } else if (
                Array.isArray(
                    response?.data?.reports
                )
            ) {

                results = response.data.reports;

            } else if (
                Array.isArray(
                    response?.data?.results
                )
            ) {

                results = response.data.results;

            } else if (
                Array.isArray(
                    response?.data?.history
                )
            ) {

                results = response.data.history;
            }


            console.log(
                "Parsed search results:",
                results
            );


            setReports(
                Array.isArray(results)
                    ? results
                    : []
            );

        } catch (err) {

            console.error(
                "Search reports error:",
                err
            );


            setReports([]);


            setError(
                err.response?.data?.detail ||
                err.response?.data?.message ||
                err.userMessage ||
                err.message ||
                "Failed to search reports."
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================================
    // VIEW REPORT
    // ==========================================================

    const handleViewReport = (report) => {

        navigate(
            "/report-viewer",
            {
                state: {
                    report: report,
                },
            }
        );
    };


    // ==========================================================
    // GET TOPIC
    // ==========================================================

    const getReportTopic = (report) => {

        if (
            !report ||
            typeof report !== "object"
        ) {
            return "Research Report";
        }


        return (
            report.research_topic ||
            report.researchTopic ||
            report.query ||
            report.topic ||
            report.search_query ||
            report.searchQuery ||
            report.title ||
            report.report_title ||
            report.reportTitle ||
            "Research Report"
        );
    };


    // ==========================================================
    // GET DATE
    // ==========================================================

    const getReportDate = (report) => {

        if (
            !report ||
            typeof report !== "object"
        ) {
            return "-";
        }


        return (
            report.generated_at ||
            report.generatedAt ||
            report.created_at ||
            report.createdAt ||
            report.timestamp ||
            report.date ||
            report.created ||
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
                min-h-screen
                pb-10
            "
        >

            <div
                className="
                    mx-auto
                    w-full
                    max-w-[1400px]
                "
            >


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

                    {/* Glow */}

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
                        "
                    >

                        {/* Badge */}

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

                            <FiSearch size={13} />

                            Research Library

                        </div>


                        {/* Heading */}

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
                            Search Reports
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
                            Quickly find your previously generated
                            research reports by searching for a topic,
                            keyword or research area.
                        </p>


                        {/* Pills */}

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
                                text={
                                    searched
                                        ? `${reports.length} Results`
                                        : "Search your reports"
                                }
                            />

                            <InfoPill
                                icon={<FiCheckCircle />}
                                text="Saved Research"
                            />

                        </div>

                    </div>

                </section>


                {/* =================================================
                    SEARCH BOX
                ================================================= */}

                <section
                    className="
                        relative
                        mb-7
                        overflow-hidden
                        rounded-[26px]
                        border
                        border-slate-200/80
                        bg-white
                        p-6
                        shadow-[0_15px_50px_rgba(15,23,42,0.05)]
                        dark:border-slate-800
                        dark:bg-[#071126]/90
                    "
                >

                    <div
                        className="
                            mb-5
                            flex
                            items-center
                            gap-3
                        "
                    >

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
                            <FiSearch />
                        </div>


                        <div>

                            <h2
                                className="
                                    text-sm
                                    font-bold
                                    text-slate-900
                                    dark:text-white
                                "
                            >
                                Find a Research Report
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    text-slate-400
                                "
                            >
                                Search using a research topic.
                            </p>

                        </div>

                    </div>


                    <form
                        onSubmit={handleSearch}
                        className="
                            flex
                            flex-col
                            gap-3
                            md:flex-row
                        "
                    >

                        <div
                            className="
                                group
                                relative
                                flex-1
                            "
                        >

                            <FiSearch
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                    transition
                                    group-focus-within:text-sky-500
                                "
                                size={19}
                            />


                            <input
                                type="text"
                                value={topic}
                                onChange={(event) =>
                                    setTopic(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter research topic..."
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    py-3.5
                                    pl-11
                                    pr-4
                                    text-sm
                                    text-slate-800
                                    outline-none
                                    transition
                                    placeholder:text-slate-400
                                    focus:border-sky-400
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-sky-500/10
                                    dark:border-slate-700
                                    dark:bg-slate-900
                                    dark:text-white
                                    dark:placeholder:text-slate-500
                                    dark:focus:border-sky-500
                                    dark:focus:bg-slate-950
                                "
                            />

                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                inline-flex
                                min-h-[52px]
                                items-center
                                justify-center
                                gap-2.5
                                rounded-xl
                                bg-gradient-to-r
                                from-sky-500
                                via-blue-500
                                to-violet-600
                                px-6
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                shadow-blue-500/20
                                transition
                                hover:-translate-y-0.5
                                hover:shadow-xl
                                hover:shadow-blue-500/30
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                                disabled:hover:translate-y-0
                            "
                        >

                            <FiSearch
                                className={
                                    loading
                                        ? "animate-pulse"
                                        : ""
                                }
                            />

                            {loading
                                ? "Searching..."
                                : "Search Reports"
                            }

                        </button>

                    </form>

                </section>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <section
                        className="
                            mb-6
                            rounded-2xl
                            border
                            border-red-200
                            bg-white
                            p-5
                            shadow-sm
                            dark:border-red-900/50
                            dark:bg-[#071126]
                        "
                    >

                        <div className="flex items-start gap-3">

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-red-50
                                    font-bold
                                    text-red-500
                                    dark:bg-red-500/10
                                "
                            >
                                !
                            </div>


                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-red-600
                                        dark:text-red-400
                                    "
                                >
                                    Search failed
                                </p>


                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-red-500/80
                                        dark:text-red-400/80
                                    "
                                >
                                    {error}
                                </p>

                            </div>

                        </div>

                    </section>

                )}


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <LoadingState />

                )}


                {/* =================================================
                    NO RESULTS
                ================================================= */}

                {!loading &&
                    searched &&
                    !error &&
                    reports.length === 0 && (

                    <section
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
                            No reports matched your search.
                            Try a different research topic or
                            generate a new report.
                        </p>


                        <div
                            className="
                                relative
                                z-10
                                mt-6
                                flex
                                flex-wrap
                                justify-center
                                gap-3
                            "
                        >

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

                                Generate Report

                            </button>


                            <button
                                type="button"
                                onClick={() => {
                                    setTopic("");
                                    setReports([]);
                                    setSearched(false);
                                    setError("");
                                }}
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-600
                                    transition
                                    hover:bg-slate-50
                                    dark:border-slate-700
                                    dark:bg-slate-900
                                    dark:text-slate-300
                                    dark:hover:bg-slate-800
                                "
                            >

                                <FiSearch />

                                New Search

                            </button>

                        </div>

                    </section>

                )}


                {/* =================================================
                    RESULTS
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

                        {/* Results Header */}

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
                                    Search Results
                                </h2>


                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-slate-400
                                    "
                                >
                                    {reports.length} report
                                    {reports.length !== 1
                                        ? "s"
                                        : ""
                                    } found for{" "}
                                    <span
                                        className="
                                            font-semibold
                                            text-sky-500
                                        "
                                    >
                                        "{topic.trim()}"
                                    </span>
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
                                    font-semibold
                                    text-slate-500
                                    dark:bg-slate-900
                                    dark:text-slate-400
                                "
                            >

                                <FiLayers size={13} />

                                {reports.length} results

                            </div>

                        </div>


                        {/* =================================================
                            DESKTOP TABLE
                        ================================================= */}

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

                                            {/* Topic */}

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


                                            {/* Version */}

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


                                            {/* Date */}

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

                                                    <FiClock
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


                                            {/* Action */}

                                            <td
                                                className="
                                                    px-6
                                                    py-5
                                                    text-right
                                                "
                                            >

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
                                                    "
                                                >

                                                    <FiEye
                                                        size={14}
                                                    />

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
                            MOBILE RESULTS
                        ================================================= */}

                        <div
                            className="
                                divide-y
                                divide-slate-100
                                md:hidden
                                dark:divide-slate-800
                            "
                        >

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

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                    "
                                                >

                                                    <FiLayers
                                                        size={12}
                                                    />

                                                    v{getReportVersion(
                                                        report
                                                    )}

                                                </span>


                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                    "
                                                >

                                                    <FiClock
                                                        size={12}
                                                    />

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

                                                <FiEye
                                                    size={13}
                                                />

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
   LOADING STATE
============================================================= */

function LoadingState() {

    return (

        <section
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

            <div
                className="
                    mb-6
                    flex
                    items-center
                    gap-3
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
                        bg-sky-50
                        dark:bg-sky-500/10
                    "
                >

                    <FiSearch
                        className="
                            animate-pulse
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
                        Searching reports
                    </p>


                    <p
                        className="
                            mt-1
                            text-xs
                            text-slate-400
                        "
                    >
                        Looking through your research history...
                    </p>

                </div>

            </div>


            <div className="space-y-3">

                {[1, 2, 3].map(
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


                        <div
                            className="
                                flex-1
                                space-y-2
                            "
                        >

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

        </section>
    );
}


export default SearchReports;