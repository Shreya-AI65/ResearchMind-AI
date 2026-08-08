import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiFileText,
    FiEye,
    FiRefreshCw,
} from "react-icons/fi";

import { getReportHistory } from "../services/reportHistoryService";


function ReportHistory() {

    const navigate = useNavigate();

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    async function loadReports() {

        try {

            setLoading(true);

            setError("");

            const response = await getReportHistory();

            console.log(
                "History response:",
                response
            );


            let history = [];


            if (Array.isArray(response)) {

                history = response;

            }

            else if (
                Array.isArray(response?.history)
            ) {

                history = response.history;

            }

            else if (
                Array.isArray(response?.reports)
            ) {

                history = response.reports;

            }

            else if (
                Array.isArray(response?.results)
            ) {

                history = response.results;

            }

            else if (
                Array.isArray(response?.data)
            ) {

                history = response.data;

            }

            else if (
                Array.isArray(
                    response?.data?.history
                )
            ) {

                history = response.data.history;

            }

            else if (
                Array.isArray(
                    response?.data?.reports
                )
            ) {

                history = response.data.reports;

            }


            console.log(
                "Parsed history:",
                history
            );


            setReports(history);

        }

        catch (err) {

            console.error(
                "Report history error:",
                err
            );


            setError(
                err.response?.data?.detail ||
                err.response?.data?.message ||
                "Failed to load report history."
            );

        }

        finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadReports();

    }, []);


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


    return (

        <div className="min-h-screen bg-sky-50 p-6 md:p-8">


            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                <div>

                    <p className="text-sky-600 font-semibold">
                        ResearchMind AI
                    </p>


                    <h1 className="text-3xl font-bold text-gray-800 mt-2">
                        Report History
                    </h1>


                    <p className="text-gray-500 mt-2">
                        View your previously generated research reports.
                    </p>

                </div>


                <button
                    onClick={loadReports}
                    className="flex items-center justify-center gap-2 bg-white border border-sky-200 text-sky-600 px-5 py-3 rounded-lg hover:bg-sky-50"
                >

                    <FiRefreshCw />

                    Refresh

                </button>

            </div>



            {/* LOADING */}

            {loading && (

                <div className="bg-white rounded-2xl p-10 text-center">

                    <p className="text-gray-500">
                        Loading report history...
                    </p>

                </div>

            )}



            {/* ERROR */}

            {!loading && error && (

                <div className="bg-white rounded-2xl p-10 text-center">

                    <p className="text-red-500">
                        {error}
                    </p>

                </div>

            )}



            {/* NO REPORTS */}

            {!loading &&
                !error &&
                reports.length === 0 && (

                    <div className="bg-white rounded-2xl border border-sky-100 p-12 text-center">

                        <FiFileText
                            size={48}
                            className="mx-auto text-sky-400 mb-4"
                        />


                        <h2 className="text-xl font-bold text-gray-800">
                            No Reports Found
                        </h2>


                        <p className="text-gray-500 mt-2">
                            Generate a report to see it here.
                        </p>


                        <button
                            onClick={() =>
                                navigate("/generate-report")
                            }
                            className="mt-5 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-lg"
                        >
                            Generate Report
                        </button>

                    </div>

                )}



            {/* REPORT TABLE */}

            {!loading &&
                !error &&
                reports.length > 0 && (

                    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-sky-500 text-white">

                                    <tr>

                                        <th className="text-left p-4">
                                            Research Topic
                                        </th>

                                        <th className="text-left p-4">
                                            Version
                                        </th>

                                        <th className="text-left p-4">
                                            Generated At
                                        </th>

                                        <th className="text-center p-4">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {reports.map(
                                        (report, index) => (

                                            <tr
                                                key={
                                                    `${report.generated_at}-${index}`
                                                }
                                                className="border-b hover:bg-sky-50"
                                            >

                                                <td className="p-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="bg-sky-100 text-sky-600 p-2 rounded-lg">

                                                            <FiFileText />

                                                        </div>


                                                        <span className="font-semibold text-gray-800">

                                                            {
                                                                report.research_topic ||
                                                                "Research Report"
                                                            }

                                                        </span>

                                                    </div>

                                                </td>


                                                <td className="p-4">

                                                    {
                                                        report.version ||
                                                        1
                                                    }

                                                </td>


                                                <td className="p-4">

                                                    {
                                                        report.generated_at ||
                                                        "-"
                                                    }

                                                </td>


                                                <td className="p-4 text-center">

                                                    <button
                                                        onClick={() =>
                                                            handleViewReport(
                                                                report
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg"
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

    );

}


export default ReportHistory;