import { useEffect, useMemo, useState } from "react";

import {
    FiArrowUpRight,
    FiBookOpen,
    FiCheckCircle,
    FiClock,
    FiFileText,
    FiPlus,
    FiSearch,
    FiTrendingUp,
    FiX,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import { getReportHistory } from "../services/reportHistoryService";


function Dashboard() {

    console.log("🔥 DASHBOARD COMPONENT LOADED");

    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");


    // =========================================================
    // LOAD REPORTS
    // =========================================================

    useEffect(() => {
        loadReports();
    }, []);


    const loadReports = async () => {

        try {

            setLoading(true);

            const response = await getReportHistory();

            console.log(
                "🔥 DASHBOARD HISTORY RESPONSE:",
                response
            );


            let history = [];


            // Direct array
            if (Array.isArray(response)) {

                history = response;

            }

            // { reports: [] }
            else if (Array.isArray(response?.reports)) {

                history = response.reports;

            }

            // { history: [] }
            else if (Array.isArray(response?.history)) {

                history = response.history;

            }

            // { results: [] }
            else if (Array.isArray(response?.results)) {

                history = response.results;

            }

            // { data: [] }
            else if (Array.isArray(response?.data)) {

                history = response.data;

            }

            // { data: { reports: [] } }
            else if (
                Array.isArray(response?.data?.reports)
            ) {

                history = response.data.reports;

            }

            // { data: { history: [] } }
            else if (
                Array.isArray(response?.data?.history)
            ) {

                history = response.data.history;

            }

            // { data: { results: [] } }
            else if (
                Array.isArray(response?.data?.results)
            ) {

                history = response.data.results;

            }


            console.log(
                "🔥 DASHBOARD PARSED REPORTS:",
                history
            );


            setReports(
                Array.isArray(history)
                    ? history
                    : []
            );

        }

        catch (error) {

            console.error(
                "❌ Dashboard history error:",
                error
            );

            setReports([]);

        }

        finally {

            setLoading(false);

        }

    };


    // =========================================================
    // REPORT TOPIC
    // =========================================================

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


    // =========================================================
    // REPORT DATE
    // =========================================================

    const getReportDate = (report) => {

        return (
            report?.generated_at ||
            report?.generatedAt ||
            report?.created_at ||
            report?.createdAt ||
            report?.timestamp ||
            report?.date ||
            report?.created ||
            null
        );

    };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {

            return "Recently generated";

        }


        const parsedDate = new Date(date);


        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return String(date);

        }


        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );

    };


    // =========================================================
    // TOTAL REPORTS
    // =========================================================

    const totalReports = reports.length;


    // =========================================================
    // UNIQUE TOPICS
    // =========================================================

    const uniqueTopics = useMemo(() => {

        const topics = reports
            .map((report) =>
                getReportTopic(report)
                    ?.trim()
                    ?.toLowerCase()
            )
            .filter(Boolean);


        return new Set(topics).size;

    }, [reports]);


    // =========================================================
    // LATEST REPORT
    // =========================================================

    const sortedReports = useMemo(() => {

        return [...reports].sort(
            (a, b) => {

                const dateA = getReportDate(a);
                const dateB = getReportDate(b);


                if (!dateA && !dateB) {

                    return 0;

                }


                if (!dateA) {

                    return 1;

                }


                if (!dateB) {

                    return -1;

                }


                return (
                    new Date(dateB).getTime() -
                    new Date(dateA).getTime()
                );

            }
        );

    }, [reports]);


    const latestReport =
        sortedReports.length > 0
            ? sortedReports[0]
            : null;


    // =========================================================
    // RECENT REPORTS
    // =========================================================

    const recentReports =
        sortedReports.slice(0, 5);


    // =========================================================
    // SEARCH RESULTS
    // =========================================================

    const searchResults = useMemo(() => {

        const query =
            searchQuery.trim().toLowerCase();


        if (!query) {

            return [];

        }


        return reports
            .filter((report) => {

                const topic =
                    getReportTopic(report)
                        ?.toLowerCase() || "";


                return topic.includes(query);

            })
            .slice(0, 8);

    }, [reports, searchQuery]);


    // =========================================================
    // CLEAR SEARCH
    // =========================================================

    const clearSearch = () => {

        setSearchQuery("");

    };


    // =========================================================
    // OPEN REPORT
    // =========================================================

    const openReport = (report) => {

        navigate(
            "/report-viewer",
            {
                state: {
                    report,
                },
            }
        );

    };


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="page-enter space-y-7 p-6 md:p-8">


            {/* =====================================================
                HERO
            ===================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-slate-200/80
                    bg-white
                    p-7
                    shadow-[0_20px_60px_rgba(15,23,42,0.07)]
                    dark:border-slate-800/80
                    dark:bg-[#071126]
                    dark:shadow-[0_25px_80px_rgba(0,0,0,0.3)]
                    md:p-9
                    lg:p-10
                "
            >

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-20
                        -top-28
                        h-72
                        w-72
                        rounded-full
                        bg-sky-400/15
                        blur-[90px]
                    "
                />


                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-28
                        right-1/3
                        h-64
                        w-64
                        rounded-full
                        bg-violet-500/10
                        blur-[90px]
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


                        {/* BADGE */}

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

                            <span
                                className="
                                    relative
                                    flex
                                    h-2
                                    w-2
                                "
                            >

                                <span
                                    className="
                                        absolute
                                        inline-flex
                                        h-full
                                        w-full
                                        animate-ping
                                        rounded-full
                                        bg-sky-400
                                        opacity-60
                                    "
                                />

                                <span
                                    className="
                                        relative
                                        inline-flex
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-sky-400
                                    "
                                />

                            </span>

                            AI Research Assistant

                        </div>


                        {/* TITLE */}

                        <h1
                            className="
                                text-3xl
                                font-bold
                                tracking-tight
                                text-slate-900
                                dark:text-white
                                sm:text-4xl
                                lg:text-[42px]
                            "
                        >

                            Welcome back, Researcher

                            <span className="ml-2">
                                👋
                            </span>

                        </h1>


                        <p
                            className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-slate-500
                                dark:text-slate-400
                                sm:text-base
                            "
                        >

                            Explore, analyze, generate and manage
                            your research reports with your intelligent
                            research workspace.

                        </p>


                        {/* BUTTONS */}

                        <div
                            className="
                                mt-7
                                flex
                                flex-wrap
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
                                    group
                                    inline-flex
                                    items-center
                                    gap-2.5
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-sky-500
                                    via-blue-500
                                    to-violet-600
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    shadow-blue-500/20
                                    transition
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:shadow-xl
                                "
                            >

                                <FiPlus size={17} />

                                Generate Report

                                <FiArrowUpRight
                                    size={16}
                                />

                            </button>


                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/search-reports"
                                    )
                                }
                                className="
                                    inline-flex
                                    items-center
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
                                    transition
                                    hover:border-sky-300
                                    hover:bg-sky-50
                                    dark:border-slate-700
                                    dark:bg-slate-900/60
                                    dark:text-slate-200
                                    dark:hover:border-sky-500/40
                                    dark:hover:bg-sky-500/10
                                "
                            >

                                <FiSearch size={16} />

                                Search Reports

                            </button>

                        </div>

                    </div>


                    {/* AI ICON */}

                    <div
                        className="
                            hidden
                            h-40
                            w-40
                            shrink-0
                            items-center
                            justify-center
                            rounded-[32px]
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
                                float-animation
                            "
                        >

                            <FiBookOpen
                                size={42}
                                className="text-white"
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                DASHBOARD SEARCH
            ===================================================== */}

            <section
                className="
                    relative
                    rounded-[24px]
                    border
                    border-slate-200/80
                    bg-white
                    p-5
                    shadow-[0_12px_40px_rgba(15,23,42,0.05)]
                    dark:border-slate-800
                    dark:bg-[#071126]/80
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-slate-800
                        dark:text-white
                    "
                >

                    <FiSearch className="text-sky-500" />

                    Search your research reports

                </div>


                <div className="relative mt-4">

                    <FiSearch
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                        size={18}
                    />


                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) =>
                            setSearchQuery(
                                event.target.value
                            )
                        }
                        placeholder="Search by research topic..."
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            py-3.5
                            pl-11
                            pr-12
                            text-sm
                            text-slate-800
                            outline-none
                            transition
                            focus:border-sky-400
                            focus:ring-4
                            focus:ring-sky-500/10
                            dark:border-slate-700
                            dark:bg-slate-900
                            dark:text-white
                            dark:placeholder:text-slate-500
                        "
                    />


                    {searchQuery && (

                        <button
                            type="button"
                            onClick={clearSearch}
                            className="
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2
                                rounded-lg
                                p-2
                                text-slate-400
                                transition
                                hover:bg-slate-200
                                hover:text-slate-700
                                dark:hover:bg-slate-800
                                dark:hover:text-white
                            "
                        >

                            <FiX size={17} />

                        </button>

                    )}

                </div>


                {/* SEARCH RESULTS */}

                {searchQuery.trim() && (

                    <div
                        className="
                            mt-4
                            overflow-hidden
                            rounded-xl
                            border
                            border-slate-200
                            dark:border-slate-800
                        "
                    >

                        {searchResults.length > 0 ? (

                            <div className="divide-y divide-slate-100 dark:divide-slate-800">

                                {searchResults.map(
                                    (report, index) => (

                                        <button
                                            key={
                                                report?.id ||
                                                report?._id ||
                                                index
                                            }
                                            type="button"
                                            onClick={() =>
                                                openReport(
                                                    report
                                                )
                                            }
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                gap-4
                                                bg-white
                                                px-4
                                                py-4
                                                text-left
                                                transition
                                                hover:bg-sky-50
                                                dark:bg-slate-900/60
                                                dark:hover:bg-sky-500/10
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    h-10
                                                    w-10
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

                                                <p
                                                    className="
                                                        truncate
                                                        text-sm
                                                        font-semibold
                                                        text-slate-800
                                                        dark:text-white
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

                                                    {formatDate(
                                                        getReportDate(
                                                            report
                                                        )
                                                    )}

                                                </p>

                                            </div>


                                            <FiArrowUpRight
                                                className="
                                                    shrink-0
                                                    text-slate-400
                                                "
                                            />

                                        </button>

                                    )
                                )}

                            </div>

                        ) : (

                            <div
                                className="
                                    px-5
                                    py-8
                                    text-center
                                "
                            >

                                <FiSearch
                                    size={28}
                                    className="
                                        mx-auto
                                        text-slate-300
                                        dark:text-slate-700
                                    "
                                />

                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        dark:text-white
                                    "
                                >

                                    No matching reports

                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-slate-400
                                    "
                                >

                                    Try another research topic.

                                </p>

                            </div>

                        )}

                    </div>

                )}

            </section>


            {/* =====================================================
                STATISTICS
            ===================================================== */}

            <section
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                <StatCard
                    title="Total Reports"
                    value={totalReports}
                    icon={<FiFileText />}
                    description="Reports generated"
                />


                <StatCard
                    title="Research Topics"
                    value={uniqueTopics}
                    icon={<FiBookOpen />}
                    description="Topics explored"
                />


                <StatCard
                    title="Research Activity"
                    value={
                        totalReports > 0
                            ? "Active"
                            : "Start"
                    }
                    icon={<FiTrendingUp />}
                    description={
                        totalReports > 0
                            ? "Workspace is active"
                            : "Generate your first report"
                    }
                />


                <StatCard
                    title="Latest Status"
                    value={
                        latestReport
                            ? "Ready"
                            : "—"
                    }
                    icon={<FiCheckCircle />}
                    description={
                        latestReport
                            ? "Latest report available"
                            : "No reports yet"
                    }
                />

            </section>


            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <section
                className="
                    grid
                    grid-cols-1
                    gap-6
                    xl:grid-cols-3
                "
            >


                {/* RECENT REPORTS */}

                <div
                    className="
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-slate-200/80
                        bg-white
                        shadow-[0_12px_40px_rgba(15,23,42,0.05)]
                        xl:col-span-2
                        dark:border-slate-800
                        dark:bg-[#071126]/80
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-100
                            px-6
                            py-5
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
                                Recent Reports
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-400
                                "
                            >
                                Your latest research activity
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/report-history"
                                )
                            }
                            className="
                                text-xs
                                font-semibold
                                text-sky-600
                                hover:text-sky-500
                                dark:text-sky-400
                            "
                        >

                            View all

                        </button>

                    </div>


                    <div
                        className="
                            divide-y
                            divide-slate-100
                            dark:divide-slate-800
                        "
                    >

                        {loading ? (

                            <LoadingState />

                        ) : recentReports.length === 0 ? (

                            <EmptyReports
                                onClick={() =>
                                    navigate(
                                        "/generate-report"
                                    )
                                }
                            />

                        ) : (

                            recentReports.map(
                                (report, index) => (

                                    <ReportRow
                                        key={
                                            report?.id ||
                                            report?._id ||
                                            index
                                        }
                                        report={report}
                                        onClick={() =>
                                            openReport(
                                                report
                                            )
                                        }
                                    />

                                )
                            )

                        )}

                    </div>

                </div>


                {/* QUICK ACTIONS */}

                <div
                    className="
                        rounded-[24px]
                        border
                        border-slate-200/80
                        bg-white
                        p-6
                        shadow-[0_12px_40px_rgba(15,23,42,0.05)]
                        dark:border-slate-800
                        dark:bg-[#071126]/80
                    "
                >

                    <h2
                        className="
                            text-base
                            font-bold
                            text-slate-900
                            dark:text-white
                        "
                    >
                        Quick Actions
                    </h2>


                    <p
                        className="
                            mt-1
                            text-xs
                            text-slate-400
                        "
                    >
                        Continue your research workflow
                    </p>


                    <div className="mt-5 space-y-3">

                        <QuickAction
                            icon={<FiPlus />}
                            title="Generate Report"
                            description="Create a new research report"
                            onClick={() =>
                                navigate(
                                    "/generate-report"
                                )
                            }
                        />


                        <QuickAction
                            icon={<FiSearch />}
                            title="Search Reports"
                            description="Find previous research"
                            onClick={() =>
                                navigate(
                                    "/search-reports"
                                )
                            }
                        />


                        <QuickAction
                            icon={<FiClock />}
                            title="Report History"
                            description="View generated reports"
                            onClick={() =>
                                navigate(
                                    "/report-history"
                                )
                            }
                        />


                        <QuickAction
                            icon={<FiTrendingUp />}
                            title="Statistics"
                            description="Explore research analytics"
                            onClick={() =>
                                navigate(
                                    "/statistics"
                                )
                            }
                        />

                    </div>

                </div>

            </section>


            {/* =====================================================
                RESEARCH INTELLIGENCE
            ===================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-blue-200/70
                    bg-gradient-to-r
                    from-sky-50
                    via-indigo-50
                    to-violet-50
                    p-6
                    dark:border-blue-500/20
                    dark:from-sky-500/10
                    dark:via-indigo-500/10
                    dark:to-violet-500/10
                "
            >

                <div
                    className="
                        relative
                        z-10
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-sky-600
                                dark:text-sky-400
                            "
                        >

                            <FiTrendingUp />

                            Research Intelligence

                        </div>


                        <h3
                            className="
                                mt-2
                                text-lg
                                font-bold
                                text-slate-900
                                dark:text-white
                            "
                        >

                            Turn research into actionable insights.

                        </h3>


                        <p
                            className="
                                mt-1
                                max-w-xl
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            "
                        >

                            Analyze papers, discover research gaps,
                            compare methodologies and build structured
                            research reports from one workspace.

                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/generate-report"
                            )
                        }
                        className="
                            shrink-0
                            rounded-xl
                            bg-slate-900
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:-translate-y-0.5
                            hover:bg-slate-800
                            dark:bg-white
                            dark:text-slate-900
                        "
                    >

                        Start Research

                    </button>

                </div>

            </section>

        </div>

    );
}


/* =============================================================
   STAT CARD
============================================================= */

function StatCard({
    title,
    value,
    icon,
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
                "
            />


            <div className="relative z-10">

                <div
                    className="
                        flex
                        items-start
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
                            bg-sky-50
                            text-sky-600
                            dark:bg-sky-500/10
                            dark:text-sky-400
                        "
                    >
                        {icon}
                    </div>


                    <FiArrowUpRight
                        size={18}
                        className="
                            text-slate-300
                            dark:text-slate-700
                        "
                    />

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
                        text-2xl
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
   REPORT ROW
============================================================= */

function ReportRow({
    report,
    onClick,
}) {

    const topic =
        report?.research_topic ||
        report?.researchTopic ||
        report?.query ||
        report?.topic ||
        report?.title ||
        "Untitled Research";


    return (

        <button
            type="button"
            onClick={onClick}
            className="
                group
                flex
                w-full
                items-center
                gap-4
                px-6
                py-4
                text-left
                transition
                hover:bg-slate-50
                dark:hover:bg-slate-900/50
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

                <FiFileText size={18} />

            </div>


            <div className="min-w-0 flex-1">

                <p
                    className="
                        truncate
                        text-sm
                        font-semibold
                        text-slate-800
                        dark:text-slate-100
                    "
                >
                    {topic}
                </p>


                <div
                    className="
                        mt-1
                        flex
                        items-center
                        gap-2
                    "
                >

                    <FiClock
                        size={12}
                        className="text-slate-400"
                    />

                    <span
                        className="
                            text-xs
                            text-slate-400
                        "
                    >
                        {formatRowDate(report)}
                    </span>

                </div>

            </div>


            <FiArrowUpRight
                size={17}
                className="
                    shrink-0
                    text-slate-300
                    transition
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:text-sky-500
                "
            />

        </button>

    );

}


function formatRowDate(report) {

    const date =
        report?.generated_at ||
        report?.generatedAt ||
        report?.created_at ||
        report?.createdAt ||
        report?.timestamp ||
        report?.date;


    if (!date) {

        return "Recently generated";

    }


    const parsed = new Date(date);


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {

        return String(date);

    }


    return parsed.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

}


/* =============================================================
   QUICK ACTION
============================================================= */

function QuickAction({
    icon,
    title,
    description,
    onClick,
}) {

    return (

        <button
            type="button"
            onClick={onClick}
            className="
                group
                flex
                w-full
                items-center
                gap-3.5
                rounded-xl
                border
                border-slate-100
                bg-slate-50/70
                p-3
                text-left
                transition
                hover:-translate-y-0.5
                hover:border-sky-200
                hover:bg-sky-50
                dark:border-slate-800
                dark:bg-slate-900/50
                dark:hover:border-sky-500/20
                dark:hover:bg-sky-500/10
            "
        >

            <div
                className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    text-sky-600
                    shadow-sm
                    dark:bg-slate-800
                    dark:text-sky-400
                "
            >
                {icon}
            </div>


            <div className="min-w-0 flex-1">

                <p
                    className="
                        text-sm
                        font-semibold
                        text-slate-800
                        dark:text-slate-100
                    "
                >
                    {title}
                </p>


                <p
                    className="
                        mt-0.5
                        truncate
                        text-xs
                        text-slate-400
                    "
                >
                    {description}
                </p>

            </div>


            <FiArrowUpRight
                size={15}
                className="
                    text-slate-300
                    transition
                    group-hover:text-sky-500
                "
            />

        </button>

    );

}


/* =============================================================
   LOADING
============================================================= */

function LoadingState() {

    return (

        <div className="space-y-4 px-6 py-6">

            {[1, 2, 3].map((item) => (

                <div
                    key={item}
                    className="
                        flex
                        animate-pulse
                        items-center
                        gap-4
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
                                w-1/2
                                rounded
                                bg-slate-200
                                dark:bg-slate-800
                            "
                        />


                        <div
                            className="
                                h-2
                                w-1/4
                                rounded
                                bg-slate-100
                                dark:bg-slate-900
                            "
                        />

                    </div>

                </div>

            ))}

        </div>

    );

}


/* =============================================================
   EMPTY REPORTS
============================================================= */

function EmptyReports({
    onClick,
}) {

    return (

        <div className="px-6 py-12 text-center">

            <div
                className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-sky-50
                    text-sky-500
                    dark:bg-sky-500/10
                    dark:text-sky-400
                "
            >

                <FiFileText size={24} />

            </div>


            <h3
                className="
                    mt-4
                    text-sm
                    font-semibold
                    text-slate-800
                    dark:text-white
                "
            >
                No research reports yet
            </h3>


            <p
                className="
                    mx-auto
                    mt-1
                    max-w-sm
                    text-xs
                    leading-5
                    text-slate-400
                "
            >
                Start your research journey by generating
                your first report.
            </p>


            <button
                type="button"
                onClick={onClick}
                className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-sky-500
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-white
                    transition
                    hover:bg-sky-600
                "
            >

                <FiPlus />

                Generate Report

            </button>

        </div>

    );

}


export default Dashboard;