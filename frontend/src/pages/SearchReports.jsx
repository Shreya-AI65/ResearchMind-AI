import { useState } from "react";
import {
    FiSearch,
    FiFileText,
} from "react-icons/fi";

import { searchReports } from "../services/searchReportService";


function SearchReports() {

    const [topic, setTopic] = useState("");

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    async function handleSearch() {

        if (!topic.trim()) {

            setError("Please enter a research topic.");

            setResults([]);

            return;

        }


        try {

            setLoading(true);

            setError("");

            setResults([]);


            const response =
                await searchReports(topic);


            console.log(
                "Search result:",
                response
            );


            let reports = [];


            if (Array.isArray(response)) {

                reports = response;

            }

            else if (
                Array.isArray(response?.results)
            ) {

                reports = response.results;

            }

            else if (
                Array.isArray(response?.history)
            ) {

                reports = response.history;

            }

            else if (
                Array.isArray(response?.data)
            ) {

                reports = response.data;

            }


            setResults(reports);


            if (reports.length === 0) {

                setError(
                    "No reports found for this topic."
                );

            }

        }

        catch (err) {

            console.error(
                "Search error:",
                err
            );


            setError(
                err.response?.data?.detail ||
                err.response?.data?.message ||
                "Search failed."
            );

        }

        finally {

            setLoading(false);

        }

    }


    return (

        <div className="min-h-screen bg-sky-50 p-6 md:p-8">


            <div className="mb-8">

                <p className="text-sky-600 font-semibold">
                    ResearchMind AI
                </p>


                <h1 className="text-3xl font-bold text-gray-800 mt-2">
                    Search Reports
                </h1>


                <p className="text-gray-500 mt-2">
                    Search your previously generated research reports.
                </p>

            </div>



            {/* SEARCH BAR */}

            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-5">

                <div className="flex flex-col md:flex-row gap-3">

                    <input
                        type="text"
                        value={topic}
                        placeholder="Enter research topic, e.g. Agentic AI"
                        onChange={(e) =>
                            setTopic(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                handleSearch();

                            }

                        }}
                        className="border border-gray-200 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    />


                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
                    >

                        <FiSearch />

                        {loading
                            ? "Searching..."
                            : "Search"}

                    </button>

                </div>

            </div>



            {/* ERROR */}

            {error && (

                <div className="mt-5 bg-white border border-red-100 rounded-xl p-5">

                    <p className="text-red-500">
                        {error}
                    </p>

                </div>

            )}



            {/* RESULTS */}

            {results.length > 0 && (

                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm mt-6 overflow-hidden">

                    <div className="p-5 border-b">

                        <h2 className="text-xl font-bold text-gray-800">

                            Search Results

                        </h2>


                        <p className="text-gray-500 text-sm mt-1">

                            {results.length} report
                            {results.length !== 1
                                ? "s"
                                : ""} found.

                        </p>

                    </div>


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

                                    <th className="text-left p-4">
                                        Files
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {results.map(
                                    (report, index) => (

                                        <tr
                                            key={
                                                `${report.generated_at}-${index}`
                                            }
                                            className="border-b hover:bg-sky-50"
                                        >

                                            <td className="p-4">

                                                <div className="flex items-center gap-2">

                                                    <FiFileText className="text-sky-500" />

                                                    <span className="font-semibold">

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


                                            <td className="p-4">

                                                <div className="flex flex-col gap-1 text-sm">

                                                    <span>
                                                        {report.pdf || "-"}
                                                    </span>

                                                    <span>
                                                        {report.docx || "-"}
                                                    </span>

                                                    <span>
                                                        {report.markdown || "-"}
                                                    </span>

                                                </div>

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


export default SearchReports;