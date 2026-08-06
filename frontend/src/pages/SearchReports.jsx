import { useState } from "react";

import { searchReports } from "../services/searchReportService";

function SearchReports() {

    const [topic, setTopic] = useState("");

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    async function handleSearch() {

        if (!topic.trim()) {

            setMessage("Please enter a research topic.");

            return;

        }

        setLoading(true);

        setMessage("");

        setResults([]);

        try {

            const response = await searchReports(topic);

            console.log("Search API Response:", response);

            const reports =
                response.results ||
                response.data?.results ||
                [];

            setResults(reports);

            if (reports.length === 0) {

                setMessage("No reports found.");

            }

        }

        catch (error) {

            console.error(error);

            setMessage(

                error.response?.data?.message ||

                error.response?.data?.detail ||

                error.message ||

                "Search failed."

            );

        }

        setLoading(false);

    }

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold text-sky-600 mb-6">

                Search Reports

            </h1>

            <div className="flex gap-4 mb-6">

                <input

                    type="text"

                    placeholder="Enter research topic"

                    value={topic}

                    onChange={(e) => setTopic(e.target.value)}

                    className="flex-1 border rounded-lg p-3"

                />

                <button

                    onClick={handleSearch}

                    className="bg-sky-500 hover:bg-sky-600 text-white px-6 rounded-lg"

                >

                    Search

                </button>

            </div>

            {loading && (

                <p>

                    Searching...

                </p>

            )}

            {message && (

                <p className="text-red-500 mb-4">

                    {message}

                </p>

            )}

            {results.length > 0 && (

                <table className="w-full bg-white rounded-lg shadow">

                    <thead className="bg-sky-500 text-white">

                        <tr>

                            <th className="p-3 text-left">

                                Topic

                            </th>

                            <th className="p-3">

                                Version

                            </th>

                            <th className="p-3">

                                Generated At

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            results.map((report, index) => (

                                <tr

                                    key={index}

                                    className="border-b hover:bg-gray-50"

                                >

                                    <td className="p-3">

                                        {report.research_topic}

                                    </td>

                                    <td className="p-3 text-center">

                                        {report.version ?? "-"}

                                    </td>

                                    <td className="p-3">

                                        {report.generated_at}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default SearchReports;