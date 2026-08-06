import { useEffect, useState } from "react";

import { getReportHistory } from "../services/historyService";

function ReportHistory() {

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchHistory();

    }, []);

    async function fetchHistory() {

        try {

            const response = await getReportHistory();

            setReports(response.history || []);

        }

        catch (error) {

            console.log(error);

        }

        setLoading(false);

    }

    return (

        <div>

            <h1 className="text-3xl font-bold text-sky-600 mb-6">

                Report History

            </h1>

            {loading && (

                <p>

                    Loading...

                </p>

            )}

            {!loading && reports.length === 0 && (

                <p>

                    No reports found.

                </p>

            )}

            {!loading && reports.length > 0 && (

                <table className="w-full bg-white rounded-lg shadow">

                    <thead className="bg-sky-500 text-white">

                        <tr>

                            <th className="p-3">
                                Topic
                            </th>

                            <th className="p-3">
                                Version
                            </th>

                            <th className="p-3">
                                Generated
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            reports.map((report, index) => (

                                <tr
                                    key={index}
                                    className="border-b"
                                >

                                    <td className="p-3">

                                        {report.research_topic}

                                    </td>

                                    <td className="p-3">

                                        {report.version || "-"}

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

export default ReportHistory;