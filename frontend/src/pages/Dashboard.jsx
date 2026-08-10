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

    // ==========================================
    // STATE
    // ==========================================

    const [reports, setReports] = useState([]);

    const [systemStatus, setSystemStatus] =
        useState("Checking...");

    const [isSystemOnline, setIsSystemOnline] =
        useState(false);


    // ==========================================
    // LOAD DASHBOARD
    // ==========================================

    useEffect(() => {
        loadDashboardData();
        checkHealth();
    }, []);


    // ==========================================
    // LOAD REPORT HISTORY
    // ==========================================

    const loadDashboardData = async () => {

        try {

            const response =
                await getReportHistory();

            console.log(
                "Dashboard history response:",
                response
            );

            let parsedReports = [];


            if (Array.isArray(response)) {

                parsedReports = response;

            } else if (
                Array.isArray(response?.data)
            ) {

                parsedReports = response.data;

            } else if (
                Array.isArray(
                    response?.data?.reports
                )
            ) {

                parsedReports =
                    response.data.reports;

            } else if (
                Array.isArray(response?.reports)
            ) {

                parsedReports =
                    response.reports;
            }


            console.log(
                "Dashboard parsed reports:",
                parsedReports
            );

            setReports(parsedReports);

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

            const response =
                await checkBackendHealth();

            console.log(
                "Backend health response:",
                response
            );


            if (
                response?.success === true &&
                response?.status === "healthy"
            ) {

                setSystemStatus("Healthy");

                setIsSystemOnline(true);

            } else if (
                response?.success === true &&
                response?.status === "degraded"
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
    // REPORT STATISTICS
    // ==========================================

    const totalReports =
        reports.length;


    const researchTopics =
        useMemo(() => {

            const topics = new Set();

            reports.forEach((report) => {

                const topic =
                    report?.query ||
                    report?.topic ||
                    report?.research_topic ||
                    report?.title;

                if (topic) {

                    topics.add(
                        String(topic).trim()
                    );
                }
            });

            return topics.size;

        }, [reports]);


    // ==========================================
    // LATEST REPORT
    // ==========================================

    const latestReport =
        reports.length > 0
            ? reports[0]
            : null;


    // ==========================================
    // RECENT REPORTS
    // ==========================================

    const recentReports =
        reports.slice(0, 5);


    // ==========================================
    // SYSTEM STATUS COLOR
    // ==========================================

    const getStatusTextColor = () => {

        if (systemStatus === "Healthy") {
            return "text-green-600";
        }

        if (systemStatus === "Degraded") {
            return "text-yellow-600";
        }

        if (systemStatus === "Checking...") {
            return "text-yellow-600";
        }

        return "text-red-600";
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
    // RENDER
    // ==========================================

    return (

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">


            {/* ======================================
                HEADER
            ====================================== */}

            <div className="mb-8">

                <p className="text-sky-600 font-semibold mb-2">
                    ResearchMind AI
                </p>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Welcome back, Researcher 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Explore, generate and manage your research reports.
                </p>

            </div>


            {/* ======================================
                QUICK ACTIONS
            ====================================== */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">


                {/* GENERATE REPORT */}

                <Link
                    to="/generate-report"
                    className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl p-6 shadow-sm transition"
                >

                    <div className="flex items-center justify-between mb-5">

                        <div className="bg-white/20 p-3 rounded-xl">
                            <FiPlus size={24} />
                        </div>

                        <FiArrowRight size={22} />

                    </div>

                    <h2 className="text-xl font-bold">
                        Generate Report
                    </h2>

                    <p className="text-sky-100 mt-2">
                        Create a new AI-powered research report.
                    </p>

                </Link>


                {/* SEARCH REPORTS */}

                <Link
                    to="/search-reports"
                    className="bg-white hover:shadow-md rounded-2xl p-6 border border-sky-100 transition"
                >

                    <div className="bg-sky-100 text-sky-600 w-fit p-3 rounded-xl mb-5">
                        <FiSearch size={24} />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        Search Reports
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Find previously generated research reports.
                    </p>

                </Link>


                {/* ANALYTICS */}

                <Link
                    to="/statistics"
                    className="bg-white hover:shadow-md rounded-2xl p-6 border border-sky-100 transition"
                >

                    <div className="bg-sky-100 text-sky-600 w-fit p-3 rounded-xl mb-5">
                        <FiBarChart2 size={24} />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        View Analytics
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Monitor your research activity and statistics.
                    </p>

                </Link>

            </div>


            {/* ======================================
                STATISTICS
            ====================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">


                {/* TOTAL REPORTS */}

                <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Total Reports
                            </p>

                            <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                {totalReports}
                            </h3>

                        </div>

                        <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">
                            <FiFileText size={22} />
                        </div>

                    </div>

                </div>


                {/* RESEARCH TOPICS */}

                <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Research Topics
                            </p>

                            <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                {researchTopics}
                            </h3>

                        </div>

                        <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">
                            <FiSearch size={22} />
                        </div>

                    </div>

                </div>


                {/* LATEST ACTIVITY */}

                <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div className="min-w-0">

                            <p className="text-gray-500 text-sm">
                                Latest Activity
                            </p>

                            <h3 className="text-lg font-bold text-gray-800 mt-2 truncate">

                                {latestReport
                                    ? (
                                        latestReport.query ||
                                        latestReport.topic ||
                                        latestReport.research_topic ||
                                        latestReport.title ||
                                        "Research"
                                    )
                                    : "No activity"
                                }

                            </h3>

                        </div>

                        <div className="bg-sky-100 text-sky-600 p-3 rounded-xl flex-shrink-0">
                            <FiClock size={22} />
                        </div>

                    </div>

                </div>


                {/* SYSTEM */}

                <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">
                                System
                            </p>

                            <h3
                                className={`text-lg font-bold mt-2 ${getStatusTextColor()}`}
                            >
                                {systemStatus}
                            </h3>

                        </div>

                        <div
                            className={`w-3 h-3 rounded-full ${getStatusDotColor()}`}
                        />

                    </div>

                </div>

            </div>
            
            {/* ======================================
                SYSTEM HEALTH
            ====================================== */}

<div className="bg-white rounded-2xl border border-sky-100 shadow-sm mb-8">

    <div className="p-6 border-b border-gray-100">

        <div className="flex items-center justify-between">

            <div>
                <h2 className="text-xl font-bold text-gray-800">
                    System Health
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                    Current status of ResearchMind AI backend services
                </p>
            </div>

            <div className="flex items-center gap-2">

                <span
                    className={`w-3 h-3 rounded-full ${getStatusDotColor()}`}
                />

                <span
                    className={`font-semibold ${getStatusTextColor()}`}
                >
                    {systemStatus}
                </span>

            </div>

        </div>

    </div>


    <div className="p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


            {/* API */}

            <div className="border border-gray-100 rounded-xl p-4">

                <div className="flex items-center justify-between">

                    <div>

                        <h3 className="font-semibold text-gray-800">
                            Backend API
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            FastAPI server
                        </p>

                    </div>

                    <span className="flex items-center gap-2 text-green-600 font-semibold text-sm">

                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />

                        Healthy

                    </span>

                </div>

            </div>


            {/* REPORT GENERATION */}

            <div className="border border-gray-100 rounded-xl p-4">

                <div className="flex items-center justify-between">

                    <div>

                        <h3 className="font-semibold text-gray-800">
                            Report Generation
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Research report service
                        </p>

                    </div>

                    <span
                        className={`flex items-center gap-2 font-semibold text-sm ${
                            isSystemOnline
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >

                        <span
                            className={`w-2.5 h-2.5 rounded-full ${
                                isSystemOnline
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }`}
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

            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm">


                {/* HEADER */}

                <div className="p-6 border-b border-gray-100 flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-gray-800">
                            Recent Research
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Your latest research activity
                        </p>

                    </div>

                    <Link
                        to="/report-history"
                        className="text-sky-600 hover:text-sky-700 font-semibold text-sm"
                    >
                        View All
                    </Link>

                </div>


                {/* REPORT LIST */}

                {recentReports.length > 0 ? (

                    <div className="divide-y divide-gray-100">

                        {recentReports.map(
                            (report, index) => {

                                const topic =
                                    report?.query ||
                                    report?.topic ||
                                    report?.research_topic ||
                                    report?.title ||
                                    "Research Report";


                                const version =
                                    report?.version ||
                                    report?.report_version;


                                const date =
                                    report?.created_at ||
                                    report?.generated_at ||
                                    report?.timestamp;


                                return (

                                    <div
                                        key={
                                            report?.id ||
                                            report?.report_id ||
                                            index
                                        }
                                        className="p-5 hover:bg-sky-50 transition"
                                    >

                                        <div className="flex items-center justify-between gap-4">


                                            <div className="flex items-center gap-4 min-w-0">

                                                <div className="bg-sky-100 text-sky-600 p-3 rounded-xl flex-shrink-0">
                                                    <FiFileText size={22} />
                                                </div>


                                                <div className="min-w-0">

                                                    <h3 className="font-semibold text-gray-800 truncate">
                                                        {topic}
                                                    </h3>


                                                    <p className="text-sm text-gray-500 mt-1">

                                                        {version
                                                            ? `Version ${version}`
                                                            : "Research Report"
                                                        }

                                                        {date
                                                            ? ` • ${new Date(date).toLocaleDateString()}`
                                                            : ""
                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            <Link
                                                to="/report-history"
                                                className="text-sky-600 hover:text-sky-700 font-semibold text-sm whitespace-nowrap"
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

                    /* EMPTY STATE */

                    <div className="p-10 text-center">

                        <div className="bg-sky-100 text-sky-600 w-fit mx-auto p-4 rounded-full mb-4">
                            <FiFileText size={28} />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-700">
                            Your research activity will appear here
                        </h3>

                        <p className="text-gray-500 mt-2 mb-5">
                            Generate your first report to start building your
                            research workspace.
                        </p>

                        <Link
                            to="/generate-report"
                            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-lg transition"
                        >
                            <FiPlus />
                            Generate Report
                        </Link>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Dashboard;