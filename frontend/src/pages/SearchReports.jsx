import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiSearch,
    FiFileText,
    FiEye,
} from "react-icons/fi";

import { searchReports } from "../services/reportSearchService";

function SearchReports() {
    const navigate = useNavigate();

    const [topic, setTopic] = useState("");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // SEARCH REPORTS
    // ==========================================

    const handleSearch = async (event) => {
        event.preventDefault();

        const cleanedTopic = topic.trim();

        if (!cleanedTopic) {
            setError("Please enter a research topic.");
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
            }
            else if (
                Array.isArray(response?.reports)
            ) {
                results = response.reports;
            }
            else if (
                Array.isArray(response?.results)
            ) {
                results = response.results;
            }
            else if (
                Array.isArray(response?.history)
            ) {
                results = response.history;
            }
            else if (
                Array.isArray(response?.data)
            ) {
                results = response.data;
            }
            else if (
                Array.isArray(
                    response?.data?.reports
                )
            ) {
                results = response.data.reports;
            }
            else if (
                Array.isArray(
                    response?.data?.results
                )
            ) {
                results = response.data.results;
            }
            else if (
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
        }
        catch (err) {
            console.error(
                "Search reports error:",
                err
            );

            setReports([]);

            setError(
                err.message ||
                "Failed to search reports."
            );
        }
        finally {
            setLoading(false);
        }
    };

    // ==========================================
    // VIEW REPORT
    // ==========================================

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

    // ==========================================
    // GET TOPIC
    // ==========================================

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

    // ==========================================
    // GET DATE
    // ==========================================

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

    // ==========================================
    // GET VERSION
    // ==========================================

    const getReportVersion = (report) => {
        return (
            report?.version ||
            report?.report_version ||
            report?.reportVersion ||
            1
        );
    };

    // ==========================================
    // PAGE
    // ==========================================

    return (
        <div className="
            min-h-screen
            bg-sky-50
            dark:bg-slate-950
            p-6
            md:p-8
            transition-colors
            duration-300
        ">

            <div className="max-w-7xl mx-auto">

                {/* ======================================
                    HEADER
                ====================================== */}

                <div className="mb-8">

                    <p className="
                        text-sky-600
                        dark:text-sky-400
                        font-semibold
                    ">
                        ResearchMind AI
                    </p>

                    <h1 className="
                        text-3xl
                        md:text-4xl
                        font-bold
                        text-gray-800
                        dark:text-white
                        mt-2
                    ">
                        Search Reports
                    </h1>

                    <p className="
                        text-gray-500
                        dark:text-slate-400
                        mt-2
                    ">
                        Search your previously generated
                        research reports by topic.
                    </p>

                </div>

                {/* ======================================
                    SEARCH FORM
                ====================================== */}

                <div className="
                    bg-white
                    dark:bg-slate-900
                    rounded-2xl
                    border
                    border-sky-100
                    dark:border-slate-800
                    shadow-sm
                    p-6
                    mb-8
                    transition-colors
                    duration-300
                ">

                    <form
                        onSubmit={handleSearch}
                        className="
                            flex
                            flex-col
                            md:flex-row
                            gap-4
                        "
                    >

                        <div className="relative flex-1">

                            <FiSearch
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                    dark:text-slate-500
                                "
                                size={20}
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
                                    pl-11
                                    pr-4
                                    py-3
                                    rounded-lg
                                    border
                                    border-gray-200
                                    dark:border-slate-700
                                    bg-white
                                    dark:bg-slate-800
                                    text-gray-800
                                    dark:text-white
                                    placeholder-gray-400
                                    dark:placeholder-slate-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-sky-400
                                    transition-colors
                                "
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                bg-sky-500
                                hover:bg-sky-600
                                disabled:bg-sky-300
                                text-white
                                px-6
                                py-3
                                rounded-lg
                                font-semibold
                                transition
                            "
                        >

                            <FiSearch />

                            {loading
                                ? "Searching..."
                                : "Search Reports"
                            }

                        </button>

                    </form>

                </div>

                {/* ======================================
                    ERROR
                ====================================== */}

                {error && (
                    <div className="
                        bg-white
                        dark:bg-slate-900
                        border
                        border-red-200
                        dark:border-red-900
                        rounded-xl
                        p-4
                        mb-6
                    ">
                        <p className="text-red-500">
                            {error}
                        </p>
                    </div>
                )}

                {/* ======================================
                    LOADING
                ====================================== */}

                {loading && (
                    <div className="
                        bg-white
                        dark:bg-slate-900
                        border
                        border-sky-100
                        dark:border-slate-800
                        rounded-2xl
                        p-10
                        text-center
                    ">
                        <p className="
                            text-gray-500
                            dark:text-slate-400
                        ">
                            Searching reports...
                        </p>
                    </div>
                )}

                {/* ======================================
                    NO RESULTS
                ====================================== */}

                {!loading &&
                    searched &&
                    !error &&
                    reports.length === 0 && (
                        <div className="
                            bg-white
                            dark:bg-slate-900
                            border
                            border-sky-100
                            dark:border-slate-800
                            rounded-2xl
                            p-12
                            text-center
                        ">

                            <FiFileText
                                size={48}
                                className="
                                    mx-auto
                                    text-sky-400
                                    mb-4
                                "
                            />

                            <h2 className="
                                text-xl
                                font-bold
                                text-gray-800
                                dark:text-white
                            ">
                                No Reports Found
                            </h2>

                            <p className="
                                text-gray-500
                                dark:text-slate-400
                                mt-2
                            ">
                                No reports matched your
                                search topic.
                            </p>

                        </div>
                    )}

                {/* ======================================
                    RESULTS
                ====================================== */}

                {!loading &&
                    reports.length > 0 && (

                        <div className="
                            bg-white
                            dark:bg-slate-900
                            rounded-2xl
                            border
                            border-sky-100
                            dark:border-slate-800
                            shadow-sm
                            overflow-hidden
                        ">

                            <div className="
                                p-6
                                border-b
                                border-gray-100
                                dark:border-slate-800
                            ">

                                <h2 className="
                                    text-xl
                                    font-bold
                                    text-gray-800
                                    dark:text-white
                                ">
                                    Search Results
                                </h2>

                                <p className="
                                    text-gray-500
                                    dark:text-slate-400
                                    text-sm
                                    mt-1
                                ">
                                    {reports.length} report
                                    {reports.length !== 1
                                        ? "s"
                                        : ""
                                    } found.
                                </p>

                            </div>

                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="
                                        bg-sky-500
                                        text-white
                                    ">

                                        <tr>

                                            <th className="
                                                text-left
                                                p-4
                                            ">
                                                Research Topic
                                            </th>

                                            <th className="
                                                text-left
                                                p-4
                                            ">
                                                Version
                                            </th>

                                            <th className="
                                                text-left
                                                p-4
                                            ">
                                                Generated At
                                            </th>

                                            <th className="
                                                text-center
                                                p-4
                                            ">
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
                                                        border-b
                                                        border-gray-100
                                                        dark:border-slate-800
                                                        hover:bg-sky-50
                                                        dark:hover:bg-slate-800/60
                                                        transition
                                                    "
                                                >

                                                    <td className="p-4">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                        ">

                                                            <div className="
                                                                bg-sky-100
                                                                dark:bg-sky-900/40
                                                                text-sky-600
                                                                dark:text-sky-400
                                                                p-2
                                                                rounded-lg
                                                                flex-shrink-0
                                                            ">
                                                                <FiFileText />
                                                            </div>

                                                            <span className="
                                                                font-semibold
                                                                text-gray-800
                                                                dark:text-white
                                                            ">
                                                                {getReportTopic(
                                                                    report
                                                                )}
                                                            </span>

                                                        </div>

                                                    </td>

                                                    <td className="
                                                        p-4
                                                        text-gray-700
                                                        dark:text-slate-300
                                                    ">
                                                        {getReportVersion(
                                                            report
                                                        )}
                                                    </td>

                                                    <td className="
                                                        p-4
                                                        text-gray-600
                                                        dark:text-slate-400
                                                    ">
                                                        {getReportDate(
                                                            report
                                                        )}
                                                    </td>

                                                    <td className="
                                                        p-4
                                                        text-center
                                                    ">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleViewReport(
                                                                    report
                                                                )
                                                            }
                                                            className="
                                                                inline-flex
                                                                items-center
                                                                gap-2
                                                                bg-sky-500
                                                                hover:bg-sky-600
                                                                text-white
                                                                px-4
                                                                py-2
                                                                rounded-lg
                                                                transition
                                                            "
                                                        >

                                                            <FiEye />

                                                            View Report

                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    )}

            </div>

        </div>
    );
}

export default SearchReports;