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


function Dashboard() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // LOAD REPORT HISTORY
    // ==========================================

    const loadDashboardData = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getReportHistory();

            console.log(
                "Dashboard history response:",
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
                Array.isArray(response?.data?.history)
            ) {

                history = response.data.history;

            } else if (
                Array.isArray(response?.data?.reports)
            ) {

                history = response.data.reports;

            }


            console.log(
                "Dashboard parsed reports:",
                history
            );


            setReports(history);

        } catch (err) {

            console.error(
                "Dashboard history error:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.response?.data?.detail ||
                "Failed to load dashboard data."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadDashboardData();

    }, []);


    // ==========================================
    // TOTAL REPORTS
    // ==========================================

    const totalReports = reports.length;


    // ==========================================
    // UNIQUE RESEARCH TOPICS
    // ==========================================

    const uniqueTopics = useMemo(() => {

        const topics = reports
            .map((report) =>
                String(
                    report?.research_topic || ""
                )
                    .trim()
                    .toLowerCase()
            )
            .filter(
                (topic) =>
                    topic &&
                    topic !== "string"
            );

        return new Set(topics).size;

    }, [reports]);


    // ==========================================
    // LATEST REPORT
    // ==========================================

    const latestReport = useMemo(() => {

        if (!reports.length) {
            return null;
        }


        return [...reports].sort(
            (a, b) => {

                const dateA =
                    new Date(
                        String(
                            a?.generated_at || ""
                        ).replace(" ", "T")
                    ).getTime();


                const dateB =
                    new Date(
                        String(
                            b?.generated_at || ""
                        ).replace(" ", "T")
                    ).getTime();


                return (
                    (isNaN(dateB) ? 0 : dateB) -
                    (isNaN(dateA) ? 0 : dateA)
                );

            }
        )[0];

    }, [reports]);


    // ==========================================
    // RECENT REPORTS
    // ==========================================

    const recentReports = useMemo(() => {

        return [...reports]
            .sort(
                (a, b) => {

                    const dateA =
                        new Date(
                            String(
                                a?.generated_at || ""
                            ).replace(" ", "T")
                        ).getTime();


                    const dateB =
                        new Date(
                            String(
                                b?.generated_at || ""
                            ).replace(" ", "T")
                        ).getTime();


                    return (
                        (isNaN(dateB) ? 0 : dateB) -
                        (isNaN(dateA) ? 0 : dateA)
                    );

                }
            )
            .slice(0, 5);

    }, [reports]);


    // ==========================================
    // FORMAT TOPIC
    // ==========================================

    const formatTopic = (topic) => {

        if (!topic || topic === "string") {
            return "Research Report";
        }

        return topic;

    };


    return (

        <div className="min-h-screen bg-sky-50 p-6 md:p-8">

            <div className="max-w-7xl mx-auto">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="mb-8">

                    <p className="text-sky-600 font-semibold mb-2">

                        ResearchMind AI

                    </p>


                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">

                        Welcome back, Researcher 👋

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Explore, generate and manage your
                        research reports.

                    </p>

                </div>



                {/* =====================================
                    ERROR
                ===================================== */}

                {error && (

                    <div className="bg-white border border-red-200 rounded-xl p-4 mb-6">

                        <p className="text-red-500">

                            {error}

                        </p>

                    </div>

                )}



                {/* =====================================
                    MAIN ACTION CARDS
                ===================================== */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">


                    {/* Generate */}

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

                            Create a new AI-powered research
                            report.

                        </p>

                    </Link>



                    {/* Search */}

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

                            Find previously generated research
                            reports.

                        </p>

                    </Link>



                    {/* Statistics */}

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

                            Monitor your research activity
                            and statistics.

                        </p>

                    </Link>

                </div>



                {/* =====================================
                    STATISTICS CARDS
                ===================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">


                    {/* Total Reports */}

                    <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 text-sm">

                                    Total Reports

                                </p>


                                <h3 className="text-3xl font-bold text-gray-800 mt-2">

                                    {loading
                                        ? "..."
                                        : totalReports}

                                </h3>

                            </div>


                            <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">

                                <FiFileText size={22} />

                            </div>

                        </div>

                    </div>



                    {/* Research Topics */}

                    <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 text-sm">

                                    Research Topics

                                </p>


                                <h3 className="text-3xl font-bold text-gray-800 mt-2">

                                    {loading
                                        ? "..."
                                        : uniqueTopics}

                                </h3>

                            </div>


                            <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">

                                <FiSearch size={22} />

                            </div>

                        </div>

                    </div>



                    {/* Latest Activity */}

                    <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 text-sm">

                                    Latest Activity

                                </p>


                                <h3 className="text-lg font-bold text-gray-800 mt-2">

                                    {loading
                                        ? "Loading..."
                                        : latestReport
                                            ? formatTopic(
                                                latestReport.research_topic
                                            )
                                            : "No Activity"}

                                </h3>

                            </div>


                            <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">

                                <FiClock size={22} />

                            </div>

                        </div>

                    </div>



                    {/* System */}

                    <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 text-sm">

                                    System

                                </p>


                                <h3 className="text-lg font-bold text-green-600 mt-2">

                                    Online

                                </h3>

                            </div>


                            <div className="w-3 h-3 bg-green-500 rounded-full" />

                        </div>

                    </div>

                </div>



                {/* =====================================
                    RECENT RESEARCH
                ===================================== */}

                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm">


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



                    {/* Loading */}

                    {loading && (

                        <div className="p-10 text-center">

                            <p className="text-gray-500">

                                Loading recent research...

                            </p>

                        </div>

                    )}



                    {/* No reports */}

                    {!loading &&
                        recentReports.length === 0 && (

                            <div className="p-10 text-center">

                                <div className="bg-sky-100 text-sky-600 w-fit mx-auto p-4 rounded-full mb-4">

                                    <FiFileText size={28} />

                                </div>


                                <h3 className="text-lg font-semibold text-gray-700">

                                    No research activity yet

                                </h3>


                                <p className="text-gray-500 mt-2 mb-5">

                                    Generate your first report to
                                    start building your research
                                    workspace.

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



                    {/* Recent reports */}

                    {!loading &&
                        recentReports.length > 0 && (

                            <div className="divide-y divide-gray-100">

                                {recentReports.map(
                                    (report, index) => (

                                        <div
                                            key={
                                                report.generated_at ||
                                                index
                                            }
                                            className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-sky-50 transition"
                                        >

                                            <div className="flex items-center gap-4">

                                                <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">

                                                    <FiFileText
                                                        size={22}
                                                    />

                                                </div>


                                                <div>

                                                    <h3 className="font-semibold text-gray-800">

                                                        {formatTopic(
                                                            report.research_topic
                                                        )}

                                                    </h3>


                                                    <p className="text-gray-500 text-sm mt-1">

                                                        {report.generated_at ||
                                                            "Date unavailable"}

                                                    </p>

                                                </div>

                                            </div>


                                            <Link
                                                to="/report-viewer"
                                                state={{
                                                    report: report,
                                                }}
                                                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm"
                                            >

                                                View Report

                                                <FiArrowRight />

                                            </Link>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                </div>

            </div>

        </div>

    );
}


export default Dashboard;