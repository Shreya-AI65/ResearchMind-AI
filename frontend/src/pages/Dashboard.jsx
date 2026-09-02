import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
    FiFileText,
    FiSearch,
    FiBarChart2,
    FiPlus,
    FiClock,
    FiArrowRight,
} from "react-icons/fi";

import { getReportHistory } from "../services/reportHistoryService";
import { checkBackendHealth } from "../services/healthService";

function Dashboard() {
    const [reports, setReports] = useState([]);
    const [systemStatus, setSystemStatus] = useState("Checking...");
    const [isSystemOnline, setIsSystemOnline] = useState(false);

    // ==========================================
    // LOAD DASHBOARD
    // ==========================================

    useEffect(() => {
        loadDashboardData();
        checkHealth();
    }, []);

    // ==========================================
    // EXTRACT REPORTS
    // ==========================================

    const extractReports = (response) => {
        if (Array.isArray(response)) {
            return response;
        }

        const possibleArrays = [
            response?.reports,
            response?.history,
            response?.data,
            response?.data?.reports,
            response?.data?.history,
            response?.data?.data,
            response?.data?.data?.reports,
            response?.results,
            response?.result,
            response?.result?.reports,
            response?.result?.data,
            response?.result?.data?.reports,
        ];

        for (const value of possibleArrays) {
            if (Array.isArray(value)) {
                return value;
            }
        }

        const findReportArray = (value, depth = 0) => {
            if (
                depth > 5 ||
                value === null ||
                value === undefined
            ) {
                return null;
            }

            if (Array.isArray(value)) {
                const looksLikeReports =
                    value.length === 0 ||
                    value.some((item) => {
                        if (
                            !item ||
                            typeof item !== "object"
                        ) {
                            return false;
                        }

                        return (
                            item.query !== undefined ||
                            item.topic !== undefined ||
                            item.research_topic !== undefined ||
                            item.report_id !== undefined ||
                            item.reportId !== undefined ||
                            item.version !== undefined ||
                            item.pdf_file !== undefined ||
                            item.pdfFile !== undefined
                        );
                    });

                if (looksLikeReports) {
                    return value;
                }

                for (const item of value) {
                    const result = findReportArray(
                        item,
                        depth + 1
                    );

                    if (result) {
                        return result;
                    }
                }

                return null;
            }

            if (typeof value === "object") {
                for (const key of Object.keys(value)) {
                    const result = findReportArray(
                        value[key],
                        depth + 1
                    );

                    if (result) {
                        return result;
                    }
                }
            }

            return null;
        };

        return findReportArray(response) || [];
    };

    // ==========================================
    // LOAD REPORT HISTORY
    // ==========================================

    const loadDashboardData = async () => {
        try {
            const response = await getReportHistory();

            console.log(
                "Dashboard history response:",
                response
            );

            const parsedReports = extractReports(response);

            console.log(
                "Dashboard parsed reports:",
                parsedReports
            );

            setReports(
                Array.isArray(parsedReports)
                    ? parsedReports
                    : []
            );
        } catch (error) {
            console.error(
                "Dashboard history error:",
                error
            );

            setReports([]);
        }
    };

    // ==========================================
    // BACKEND HEALTH CHECK
    // ==========================================

    const checkHealth = async () => {
        try {
            const response = await checkBackendHealth();

            console.log(
                "Backend health response:",
                response
            );

            const healthData =
                response?.data || response;

            if (
                healthData?.success === true &&
                healthData?.status === "healthy"
            ) {
                setSystemStatus("Healthy");
                setIsSystemOnline(true);
            } else if (
                healthData?.success === true &&
                healthData?.status === "degraded"
            ) {
                setSystemStatus("Degraded");
                setIsSystemOnline(true);
            } else if (
                healthData?.status === "healthy"
            ) {
                setSystemStatus("Healthy");
                setIsSystemOnline(true);
            } else if (
                healthData?.status === "degraded"
            ) {
                setSystemStatus("Degraded");
                setIsSystemOnline(true);
            } else {
                setSystemStatus("Offline");
                setIsSystemOnline(false);
            }
        } catch (error) {
            console.error(
                "Backend health check failed:",
                error
            );

            setSystemStatus("Offline");
            setIsSystemOnline(false);
        }
    };

    // ==========================================
    // GET REPORT TOPIC
    // ==========================================

    const getReportTopic = (report) => {
        if (
            !report ||
            typeof report !== "object"
        ) {
            return null;
        }

        return (
            report.query ||
            report.topic ||
            report.research_topic ||
            report.researchTopic ||
            report.search_query ||
            report.searchQuery ||
            report.title ||
            report.report_title ||
            report.reportTitle ||
            report.name ||
            null
        );
    };

    // ==========================================
    // GET REPORT DATE
    // ==========================================

    const getReportDate = (report) => {
        if (
            !report ||
            typeof report !== "object"
        ) {
            return null;
        }

        return (
            report.created_at ||
            report.createdAt ||
            report.generated_at ||
            report.generatedAt ||
            report.timestamp ||
            report.date ||
            report.created ||
            null
        );
    };

    // ==========================================
    // STATISTICS
    // ==========================================

    const totalReports = reports.length;

    const researchTopics = useMemo(() => {
        const topics = new Set();

        reports.forEach((report) => {
            const topic = getReportTopic(report);

            if (topic) {
                const cleanedTopic = String(topic).trim();

                if (cleanedTopic) {
                    topics.add(
                        cleanedTopic.toLowerCase()
                    );
                }
            }
        });

        return topics.size;
    }, [reports]);

    // ==========================================
    // SORT REPORTS
    // ==========================================

    const sortedReports = useMemo(() => {
        return [...reports].sort((a, b) => {
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
        });
    }, [reports]);

    const latestReport =
        sortedReports.length > 0
            ? sortedReports[0]
            : null;

    const recentReports =
        sortedReports.slice(0, 5);

    // ==========================================
    // SYSTEM STATUS
    // ==========================================

    const getStatusTextColor = () => {
        if (systemStatus === "Healthy") {
            return "text-green-500";
        }

        if (systemStatus === "Degraded") {
            return "text-yellow-500";
        }

        if (systemStatus === "Checking...") {
            return "text-yellow-500";
        }

        return "text-red-500";
    };

    const getStatusDotColor = () => {
        if (systemStatus === "Healthy") {
            return "bg-green-500";
        }

        if (systemStatus === "Degraded") {
            return "bg-yellow-500";
        }

        if (systemStatus === "Checking...") {
            return "bg-yellow-500";
        }

        return "bg-red-500";
    };

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        const parsedDate = new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "";
        }

        return parsedDate.toLocaleDateString();
    };

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div
            className="
                min-h-screen
                bg-sky-50
                dark:bg-slate-950
                text-gray-800
                dark:text-white
                transition-colors
                duration-300
            "
        >
            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-4
                    md:px-6
                    py-8
                "
            >
                {/* ======================================
                    HEADER
                ====================================== */}

                <div className="mb-8">
                    <p
                        className="
                            text-sky-600
                            dark:text-sky-400
                            font-semibold
                            mb-2
                        "
                    >
                        ResearchMind AI
                    </p>

                    <h1
                        className="
                            text-3xl
                            md:text-4xl
                            font-bold
                            text-gray-800
                            dark:text-white
                        "
                    >
                        Welcome back, Researcher 👋
                    </h1>

                    <p
                        className="
                            text-gray-500
                            dark:text-slate-400
                            mt-2
                        "
                    >
                        Explore, generate and manage
                        your research reports.
                    </p>
                </div>

                {/* ======================================
                    QUICK ACTIONS
                ====================================== */}

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-5
                        mb-8
                    "
                >
                    {/* GENERATE */}

                    <Link
                        to="/generate-report"
                        className="
                            group
                            bg-gradient-to-br
                            from-sky-500
                            to-blue-600
                            hover:from-sky-600
                            hover:to-blue-700
                            text-white
                            rounded-2xl
                            p-6
                            shadow-md
                            hover:shadow-xl
                            transition-all
                            duration-300
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                mb-5
                            "
                        >
                            <div
                                className="
                                    bg-white/20
                                    backdrop-blur-sm
                                    p-3
                                    rounded-xl
                                "
                            >
                                <FiPlus size={24} />
                            </div>

                            <FiArrowRight
                                size={22}
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </div>

                        <h2 className="text-xl font-bold">
                            Generate Report
                        </h2>

                        <p
                            className="
                                text-sky-100
                                mt-2
                            "
                        >
                            Create a new AI-powered
                            research report.
                        </p>
                    </Link>

                    {/* SEARCH */}

                    <Link
                        to="/search-reports"
                        className="
                            group
                            bg-white
                            dark:bg-slate-900
                            hover:shadow-xl
                            rounded-2xl
                            p-6
                            border
                            border-sky-100
                            dark:border-slate-800
                            transition-all
                            duration-300
                        "
                    >
                        <div
                            className="
                                bg-sky-100
                                dark:bg-sky-900/40
                                text-sky-600
                                dark:text-sky-400
                                w-fit
                                p-3
                                rounded-xl
                                mb-5
                            "
                        >
                            <FiSearch size={24} />
                        </div>

                        <h2
                            className="
                                text-xl
                                font-bold
                                text-gray-800
                                dark:text-white
                            "
                        >
                            Search Reports
                        </h2>

                        <p
                            className="
                                mt-2
                                text-gray-500
                                dark:text-slate-400
                            "
                        >
                            Find previously generated
                            research reports.
                        </p>
                    </Link>

                    {/* ANALYTICS */}

                    <Link
                        to="/statistics"
                        className="
                            group
                            bg-white
                            dark:bg-slate-900
                            hover:shadow-xl
                            rounded-2xl
                            p-6
                            border
                            border-sky-100
                            dark:border-slate-800
                            transition-all
                            duration-300
                        "
                    >
                        <div
                            className="
                                bg-sky-100
                                dark:bg-sky-900/40
                                text-sky-600
                                dark:text-sky-400
                                w-fit
                                p-3
                                rounded-xl
                                mb-5
                            "
                        >
                            <FiBarChart2 size={24} />
                        </div>

                        <h2
                            className="
                                text-xl
                                font-bold
                                text-gray-800
                                dark:text-white
                            "
                        >
                            View Analytics
                        </h2>

                        <p
                            className="
                                mt-2
                                text-gray-500
                                dark:text-slate-400
                            "
                        >
                            Monitor your research activity
                            and statistics.
                        </p>
                    </Link>
                </div>

                {/* ======================================
                    STATISTICS
                ====================================== */}

                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4
                        gap-5
                        mb-8
                    "
                >
                    {/* TOTAL REPORTS */}

                    <div
                        className="
                            bg-white
                            dark:bg-slate-900
                            rounded-2xl
                            p-6
                            border
                            border-sky-100
                            dark:border-slate-800
                            shadow-sm
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div>
                                <p
                                    className="
                                        text-gray-500
                                        dark:text-slate-400
                                        text-sm
                                    "
                                >
                                    Total Reports
                                </p>

                                <h3
                                    className="
                                        text-3xl
                                        font-bold
                                        text-gray-800
                                        dark:text-white
                                        mt-2
                                    "
                                >
                                    {totalReports}
                                </h3>
                            </div>

                            <div
                                className="
                                    bg-sky-100
                                    dark:bg-sky-900/40
                                    text-sky-600
                                    dark:text-sky-400
                                    p-3
                                    rounded-xl
                                "
                            >
                                <FiFileText size={22} />
                            </div>
                        </div>
                    </div>

                    {/* RESEARCH TOPICS */}

                    <div
                        className="
                            bg-white
                            dark:bg-slate-900
                            rounded-2xl
                            p-6
                            border
                            border-sky-100
                            dark:border-slate-800
                            shadow-sm
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div>
                                <p
                                    className="
                                        text-gray-500
                                        dark:text-slate-400
                                        text-sm
                                    "
                                >
                                    Research Topics
                                </p>

                                <h3
                                    className="
                                        text-3xl
                                        font-bold
                                        text-gray-800
                                        dark:text-white
                                        mt-2
                                    "
                                >
                                    {researchTopics}
                                </h3>
                            </div>

                            <div
                                className="
                                    bg-sky-100
                                    dark:bg-sky-900/40
                                    text-sky-600
                                    dark:text-sky-400
                                    p-3
                                    rounded-xl
                                "
                            >
                                <FiSearch size={22} />
                            </div>
                        </div>
                    </div>

                    {/* LATEST ACTIVITY */}

                    <div
                        className="
                            bg-white
                            dark:bg-slate-900
                            rounded-2xl
                            p-6
                            border
                            border-sky-100
                            dark:border-slate-800
                            shadow-sm
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div className="min-w-0">
                                <p
                                    className="
                                        text-gray-500
                                        dark:text-slate-400
                                        text-sm
                                    "
                                >
                                    Latest Activity
                                </p>

                                <h3
                                    className="
                                        text-lg
                                        font-bold
                                        text-gray-800
                                        dark:text-white
                                        mt-2
                                        truncate
                                    "
                                >
                                    {latestReport
                                        ? (
                                            getReportTopic(
                                                latestReport
                                            ) || "Research"
                                        )
                                        : "No activity"}
                                </h3>
                            </div>

                            <div
                                className="
                                    bg-sky-100
                                    dark:bg-sky-900/40
                                    text-sky-600
                                    dark:text-sky-400
                                    p-3
                                    rounded-xl
                                    flex-shrink-0
                                "
                            >
                                <FiClock size={22} />
                            </div>
                        </div>
                    </div>

                    {/* SYSTEM */}

                    <div
                        className="
                            bg-white
                            dark:bg-slate-900
                            rounded-2xl
                            p-6
                            border
                            border-sky-100
                            dark:border-slate-800
                            shadow-sm
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div>
                                <p
                                    className="
                                        text-gray-500
                                        dark:text-slate-400
                                        text-sm
                                    "
                                >
                                    System
                                </p>

                                <h3
                                    className={`
                                        text-lg
                                        font-bold
                                        mt-2
                                        ${getStatusTextColor()}
                                    `}
                                >
                                    {systemStatus}
                                </h3>
                            </div>

                            <div
                                className={`
                                    w-3
                                    h-3
                                    rounded-full
                                    ${getStatusDotColor()}
                                `}
                            />
                        </div>
                    </div>
                </div>

                {/* ======================================
                    SYSTEM HEALTH
                ====================================== */}

                <div
                    className="
                        bg-white
                        dark:bg-slate-900
                        rounded-2xl
                        border
                        border-sky-100
                        dark:border-slate-800
                        shadow-sm
                        mb-8
                    "
                >
                    <div
                        className="
                            p-6
                            border-b
                            border-gray-100
                            dark:border-slate-800
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div>
                                <h2
                                    className="
                                        text-xl
                                        font-bold
                                        text-gray-800
                                        dark:text-white
                                    "
                                >
                                    System Health
                                </h2>

                                <p
                                    className="
                                        text-gray-500
                                        dark:text-slate-400
                                        text-sm
                                        mt-1
                                    "
                                >
                                    Current status of
                                    ResearchMind AI backend services
                                </p>
                            </div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <span
                                    className={`
                                        w-3
                                        h-3
                                        rounded-full
                                        ${getStatusDotColor()}
                                    `}
                                />

                                <span
                                    className={`
                                        font-semibold
                                        ${getStatusTextColor()}
                                    `}
                                >
                                    {systemStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-4
                            "
                        >
                            {/* BACKEND API */}

                            <div
                                className="
                                    border
                                    border-gray-100
                                    dark:border-slate-800
                                    rounded-xl
                                    p-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <div>
                                        <h3
                                            className="
                                                font-semibold
                                                text-gray-800
                                                dark:text-white
                                            "
                                        >
                                            Backend API
                                        </h3>

                                        <p
                                            className="
                                                text-sm
                                                text-gray-500
                                                dark:text-slate-400
                                                mt-1
                                            "
                                        >
                                            FastAPI server
                                        </p>
                                    </div>

                                    <span
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-green-500
                                            font-semibold
                                            text-sm
                                        "
                                    >
                                        <span
                                            className="
                                                w-2.5
                                                h-2.5
                                                bg-green-500
                                                rounded-full
                                            "
                                        />

                                        Healthy
                                    </span>
                                </div>
                            </div>

                            {/* REPORT GENERATION */}

                            <div
                                className="
                                    border
                                    border-gray-100
                                    dark:border-slate-800
                                    rounded-xl
                                    p-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <div>
                                        <h3
                                            className="
                                                font-semibold
                                                text-gray-800
                                                dark:text-white
                                            "
                                        >
                                            Report Generation
                                        </h3>

                                        <p
                                            className="
                                                text-sm
                                                text-gray-500
                                                dark:text-slate-400
                                                mt-1
                                            "
                                        >
                                            Research report service
                                        </p>
                                    </div>

                                    <span
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            font-semibold
                                            text-sm
                                            ${
                                                isSystemOnline
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }
                                        `}
                                    >
                                        <span
                                            className={`
                                                w-2.5
                                                h-2.5
                                                rounded-full
                                                ${
                                                    isSystemOnline
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }
                                            `}
                                        />

                                        {isSystemOnline
                                            ? "Available"
                                            : "Unavailable"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ======================================
                    RECENT RESEARCH
                ====================================== */}

                <div
                    className="
                        bg-white
                        dark:bg-slate-900
                        rounded-2xl
                        border
                        border-sky-100
                        dark:border-slate-800
                        shadow-sm
                    "
                >
                    <div
                        className="
                            p-6
                            border-b
                            border-gray-100
                            dark:border-slate-800
                            flex
                            items-center
                            justify-between
                        "
                    >
                        <div>
                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-gray-800
                                    dark:text-white
                                "
                            >
                                Recent Research
                            </h2>

                            <p
                                className="
                                    text-gray-500
                                    dark:text-slate-400
                                    text-sm
                                    mt-1
                                "
                            >
                                Your latest research activity
                            </p>
                        </div>

                        <Link
                            to="/report-history"
                            className="
                                text-sky-600
                                dark:text-sky-400
                                hover:text-sky-700
                                dark:hover:text-sky-300
                                font-semibold
                                text-sm
                            "
                        >
                            View All
                        </Link>
                    </div>

                    {recentReports.length > 0 ? (
                        <div
                            className="
                                divide-y
                                divide-gray-100
                                dark:divide-slate-800
                            "
                        >
                            {recentReports.map(
                                (report, index) => {
                                    const topic =
                                        getReportTopic(report) ||
                                        "Research Report";

                                    const version =
                                        report?.version ||
                                        report?.report_version ||
                                        report?.reportVersion;

                                    const date =
                                        getReportDate(report);

                                    return (
                                        <div
                                            key={
                                                report?.id ||
                                                report?.report_id ||
                                                report?.reportId ||
                                                index
                                            }
                                            className="
                                                p-5
                                                hover:bg-sky-50
                                                dark:hover:bg-slate-800/60
                                                transition
                                            "
                                        >
                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-4
                                                "
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-4
                                                        min-w-0
                                                    "
                                                >
                                                    <div
                                                        className="
                                                            bg-sky-100
                                                            dark:bg-sky-900/40
                                                            text-sky-600
                                                            dark:text-sky-400
                                                            p-3
                                                            rounded-xl
                                                            flex-shrink-0
                                                        "
                                                    >
                                                        <FiFileText
                                                            size={22}
                                                        />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3
                                                            className="
                                                                font-semibold
                                                                text-gray-800
                                                                dark:text-white
                                                                truncate
                                                            "
                                                        >
                                                            {topic}
                                                        </h3>

                                                        <p
                                                            className="
                                                                text-sm
                                                                text-gray-500
                                                                dark:text-slate-400
                                                                mt-1
                                                            "
                                                        >
                                                            {version
                                                                ? `Version ${version}`
                                                                : "Research Report"}

                                                            {date
                                                                ? ` • ${formatDate(date)}`
                                                                : ""}
                                                        </p>
                                                    </div>
                                                </div>

                                                <Link
                                                    to="/report-history"
                                                    className="
                                                        text-sky-600
                                                        dark:text-sky-400
                                                        hover:text-sky-700
                                                        dark:hover:text-sky-300
                                                        font-semibold
                                                        text-sm
                                                        whitespace-nowrap
                                                    "
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    ) : (
                        <div className="p-10 text-center">
                            <div
                                className="
                                    bg-sky-100
                                    dark:bg-sky-900/40
                                    text-sky-600
                                    dark:text-sky-400
                                    w-fit
                                    mx-auto
                                    p-4
                                    rounded-full
                                    mb-4
                                "
                            >
                                <FiFileText size={28} />
                            </div>

                            <h3
                                className="
                                    text-lg
                                    font-semibold
                                    text-gray-700
                                    dark:text-slate-200
                                "
                            >
                                Your research activity
                                will appear here
                            </h3>

                            <p
                                className="
                                    text-gray-500
                                    dark:text-slate-400
                                    mt-2
                                    mb-5
                                "
                            >
                                Generate your first report
                                to start building your
                                research workspace.
                            </p>

                            <Link
                                to="/generate-report"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    bg-sky-500
                                    hover:bg-sky-600
                                    text-white
                                    px-5
                                    py-3
                                    rounded-lg
                                    transition
                                "
                            >
                                <FiPlus />
                                Generate Report
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;