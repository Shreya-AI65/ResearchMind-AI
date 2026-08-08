import { useEffect, useMemo, useState } from "react";
import {
    FiBarChart2,
    FiFileText,
    FiActivity,
    FiRefreshCw,
    FiCheckCircle,
} from "react-icons/fi";

import { getReportHistory } from "../services/reportHistoryService";


function Statistics() {

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==============================
    // LOAD REPORT HISTORY
    // ==============================

    const loadStatistics = async () => {

        try {

            setLoading(true);

            setError("");


            const response = await getReportHistory();


            console.log(
                "STATISTICS RESPONSE:",
                response
            );


            let history = [];


            // Backend response:
            // {
            //     status: "success",
            //     total_reports: 37,
            //     history: [...]
            // }

            if (Array.isArray(response)) {

                history = response;

            }

            else if (Array.isArray(response?.history)) {

                history = response.history;

            }

            else if (Array.isArray(response?.reports)) {

                history = response.reports;

            }

            else if (Array.isArray(response?.results)) {

                history = response.results;

            }

            else if (Array.isArray(response?.data)) {

                history = response.data;

            }

            else if (
                Array.isArray(response?.data?.history)
            ) {

                history = response.data.history;

            }

            else if (
                Array.isArray(response?.data?.reports)
            ) {

                history = response.data.reports;

            }


            console.log(
                "PARSED STATISTICS REPORTS:",
                history
            );


            setReports(history);

        }

        catch (err) {

            console.error(
                "Statistics error:",
                err
            );


            setError(
                err.response?.data?.detail ||
                err.response?.data?.message ||
                "Failed to load statistics."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==============================
    // INITIAL LOAD
    // ==============================

    useEffect(() => {

        loadStatistics();

    }, []);


    // ==============================
    // TOTAL REPORTS
    // ==============================

    const totalReports = reports.length;


    // ==============================
    // UNIQUE RESEARCH TOPICS
    // ==============================

    const uniqueTopics = useMemo(() => {

        const topics = reports
            .map((report) =>
                report?.research_topic
                    ?.trim()
                    ?.toLowerCase()
            )
            .filter(Boolean);


        return new Set(topics).size;

    }, [reports]);


    // ==============================
    // TOPIC COUNTS
    // ==============================

    const topicCounts = useMemo(() => {

        const counts = {};


        reports.forEach((report) => {

            const topic =
                report?.research_topic?.trim();


            if (!topic) {

                return;

            }


            const key = topic.toLowerCase();


            if (!counts[key]) {

                counts[key] = {

                    name: topic,

                    count: 0,

                };

            }


            counts[key].count += 1;

        });


        return Object.values(counts);

    }, [reports]);


    // ==============================
    // MOST ACTIVE TOPIC
    // ==============================

    const mostActiveTopic = useMemo(() => {

        if (topicCounts.length === 0) {

            return null;

        }


        return [...topicCounts].sort(
            (a, b) => b.count - a.count
        )[0];

    }, [topicCounts]);


    // ==============================
    // LATEST REPORT
    // ==============================

    const latestReport = useMemo(() => {

        if (reports.length === 0) {

            return null;

        }


        return reports[reports.length - 1];

    }, [reports]);


    // ==============================
    // RECENT ACTIVITY
    // ==============================

    const recentActivity = useMemo(() => {

        return [...reports]
            .reverse()
            .slice(0, 7);

    }, [reports]);


    // ==============================
    // PAGE
    // ==============================

    return (

        <div className="min-h-screen bg-sky-50 p-6 md:p-8">


            {/* ============================== */}
            {/* HEADER */}
            {/* ============================== */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                <div>

                    <p className="text-sky-600 font-semibold">
                        ResearchMind AI
                    </p>


                    <h1 className="text-3xl font-bold text-gray-800 mt-2">
                        Statistics
                    </h1>


                    <p className="text-gray-500 mt-2">
                        Overview of your generated research reports.
                    </p>

                </div>


                <button
                    onClick={loadStatistics}
                    className="flex items-center justify-center gap-2 bg-white border border-sky-200 text-sky-600 px-5 py-3 rounded-lg hover:bg-sky-50"
                >

                    <FiRefreshCw />

                    Refresh

                </button>

            </div>



            {/* ============================== */}
            {/* LOADING */}
            {/* ============================== */}

            {loading && (

                <div className="bg-white rounded-2xl p-10 text-center">

                    <p className="text-gray-500">
                        Loading statistics...
                    </p>

                </div>

            )}



            {/* ============================== */}
            {/* ERROR */}
            {/* ============================== */}

            {!loading && error && (

                <div className="bg-white rounded-2xl border border-red-100 p-8 text-center">

                    <p className="text-red-500">
                        {error}
                    </p>

                </div>

            )}



            {/* ============================== */}
            {/* STATISTICS CONTENT */}
            {/* ============================== */}

            {!loading && !error && (

                <>


                    {/* ============================== */}
                    {/* STAT CARDS */}
                    {/* ============================== */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">


                        {/* TOTAL REPORTS */}

                        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Total Reports
                                    </p>


                                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                        {totalReports}
                                    </h2>

                                </div>


                                <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">

                                    <FiFileText size={25} />

                                </div>

                            </div>

                        </div>



                        {/* RESEARCH TOPICS */}

                        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Research Topics
                                    </p>


                                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                        {uniqueTopics}
                                    </h2>

                                </div>


                                <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">

                                    <FiBarChart2 size={25} />

                                </div>

                            </div>

                        </div>



                        {/* MOST ACTIVE TOPIC */}

                        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                            <div className="flex items-center justify-between">

                                <div className="min-w-0">

                                    <p className="text-gray-500 text-sm">
                                        Most Active Topic
                                    </p>


                                    {mostActiveTopic ? (

                                        <>

                                            <h2 className="text-lg font-bold text-gray-800 mt-2 truncate">

                                                {mostActiveTopic.name}

                                            </h2>


                                            <p className="text-gray-400 text-sm mt-1">

                                                {mostActiveTopic.count} report
                                                {mostActiveTopic.count !== 1
                                                    ? "s"
                                                    : ""}

                                            </p>

                                        </>

                                    ) : (

                                        <h2 className="text-lg font-bold text-gray-400 mt-2">

                                            No data

                                        </h2>

                                    )}

                                </div>


                                <div className="bg-green-100 text-green-600 p-3 rounded-xl">

                                    <FiActivity size={25} />

                                </div>

                            </div>

                        </div>



                        {/* SYSTEM STATUS */}

                        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        System Status
                                    </p>


                                    <h2 className="text-xl font-bold text-green-600 mt-2">
                                        Online
                                    </h2>

                                </div>


                                <div className="bg-green-100 text-green-600 p-3 rounded-xl">

                                    <FiCheckCircle size={25} />

                                </div>

                            </div>

                        </div>

                    </div>



                    {/* ============================== */}
                    {/* TOPIC DISTRIBUTION + ACTIVITY */}
                    {/* ============================== */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">


                        {/* TOPIC DISTRIBUTION */}

                        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-800">
                                Reports by Research Topic
                            </h2>


                            <p className="text-gray-500 text-sm mt-1 mb-6">
                                Distribution of generated reports.
                            </p>


                            {topicCounts.length === 0 ? (

                                <div className="text-center py-10">

                                    <FiBarChart2
                                        size={40}
                                        className="mx-auto text-gray-300 mb-3"
                                    />


                                    <p className="text-gray-400">
                                        No topic statistics available yet.
                                    </p>

                                </div>

                            ) : (

                                <div className="space-y-5">

                                    {[...topicCounts]
                                        .sort(
                                            (a, b) =>
                                                b.count - a.count
                                        )
                                        .map((topic) => {

                                            const percentage =
                                                totalReports > 0
                                                    ? (
                                                        topic.count /
                                                        totalReports
                                                    ) * 100
                                                    : 0;


                                            return (

                                                <div
                                                    key={topic.name}
                                                >

                                                    <div className="flex justify-between mb-2">

                                                        <span className="font-medium text-gray-700">

                                                            {topic.name}

                                                        </span>


                                                        <span className="text-gray-500">

                                                            {topic.count}

                                                        </span>

                                                    </div>


                                                    <div className="w-full bg-gray-100 rounded-full h-3">

                                                        <div
                                                            className="bg-sky-500 h-3 rounded-full"
                                                            style={{
                                                                width:
                                                                    `${percentage}%`,
                                                            }}
                                                        />

                                                    </div>

                                                </div>

                                            );

                                        })}

                                </div>

                            )}

                        </div>



                        {/* ACTIVITY SUMMARY */}

                        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-800">
                                Activity Summary
                            </h2>


                            <p className="text-gray-500 text-sm mt-1 mb-6">
                                Latest research activity.
                            </p>


                            {recentActivity.length === 0 ? (

                                <div className="text-center py-10">

                                    <FiActivity
                                        size={40}
                                        className="mx-auto text-gray-300 mb-3"
                                    />


                                    <p className="text-gray-400">
                                        No activity available yet.
                                    </p>

                                </div>

                            ) : (

                                <div className="space-y-4">

                                    {recentActivity.map(
                                        (report, index) => (

                                            <div
                                                key={`${report.generated_at}-${index}`}
                                                className="flex items-center gap-4 border-b pb-3"
                                            >

                                                <div className="bg-sky-100 text-sky-600 p-2 rounded-lg">

                                                    <FiFileText />

                                                </div>


                                                <div className="min-w-0">

                                                    <p className="font-semibold text-gray-800 truncate">

                                                        {report.research_topic ||
                                                            "Research Report"}

                                                    </p>


                                                    <p className="text-sm text-gray-400">

                                                        {report.generated_at ||
                                                            "-"}

                                                    </p>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    </div>



                    {/* ============================== */}
                    {/* LATEST REPORT */}
                    {/* ============================== */}

                    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 mt-6">

                        <h2 className="text-xl font-bold text-gray-800">
                            Latest Report
                        </h2>


                        {latestReport ? (

                            <div className="mt-4 bg-sky-50 rounded-xl p-5">

                                <p className="text-sm text-sky-600 font-semibold">
                                    Latest Research
                                </p>


                                <h3 className="text-xl font-bold text-gray-800 mt-1">

                                    {latestReport.research_topic ||
                                        "Research Report"}

                                </h3>


                                <p className="text-gray-500 mt-2">

                                    {latestReport.generated_at ||
                                        "-"}

                                </p>


                                {latestReport.version && (

                                    <p className="text-gray-400 text-sm mt-1">

                                        Version {latestReport.version}

                                    </p>

                                )}

                            </div>

                        ) : (

                            <p className="text-gray-400 mt-3">
                                No reports available yet.
                            </p>

                        )}

                    </div>



                    {/* ============================== */}
                    {/* RESEARCH SUMMARY */}
                    {/* ============================== */}

                    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 mt-6">

                        <h2 className="text-xl font-bold text-gray-800">
                            Research Summary
                        </h2>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">


                            {/* REPORTS LOADED */}

                            <div className="bg-sky-50 rounded-xl p-5">

                                <p className="text-gray-500 text-sm">
                                    Reports Loaded
                                </p>


                                <p className="text-2xl font-bold text-gray-800 mt-2">
                                    {totalReports}
                                </p>

                            </div>



                            {/* UNIQUE TOPICS */}

                            <div className="bg-purple-50 rounded-xl p-5">

                                <p className="text-gray-500 text-sm">
                                    Unique Topics
                                </p>


                                <p className="text-2xl font-bold text-gray-800 mt-2">
                                    {uniqueTopics}
                                </p>

                            </div>



                            {/* SYSTEM */}

                            <div className="bg-green-50 rounded-xl p-5">

                                <p className="text-gray-500 text-sm">
                                    System
                                </p>


                                <p className="text-2xl font-bold text-green-600 mt-2">
                                    Online
                                </p>

                            </div>

                        </div>

                    </div>


                </>

            )}

        </div>

    );

}


export default Statistics;