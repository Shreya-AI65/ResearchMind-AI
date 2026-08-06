import { useEffect, useState } from "react";

import { getStatistics } from "../services/statisticsService";

function Statistics() {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadStatistics();

    }, []);

    async function loadStatistics() {

        try {

            const response = await getStatistics();

            setStats(response.data);

        }

        catch (error) {

            console.log(error);

        }

        setLoading(false);

    }

    if (loading) {

        return <p>Loading Statistics...</p>;

    }

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold text-sky-600 mb-8">

                Report Statistics

            </h1>

            <div className="grid grid-cols-2 gap-6">

                <div className="bg-white shadow rounded-xl p-6">

                    <h2 className="text-gray-500">

                        Total Reports

                    </h2>

                    <p className="text-4xl font-bold mt-2">

                        {stats.total_reports}

                    </p>

                </div>

                <div className="bg-white shadow rounded-xl p-6">

                    <h2 className="text-gray-500">

                        Total Topics

                    </h2>

                    <p className="text-4xl font-bold mt-2">

                        {stats.total_topics}

                    </p>

                </div>

                <div className="bg-white shadow rounded-xl p-6">

                    <h2 className="text-gray-500">

                        Most Popular Topic

                    </h2>

                    <p className="text-xl font-bold mt-2">

                        {stats.most_popular_topic?.topic}

                    </p>

                    <p className="text-gray-500">

                        {stats.most_popular_topic?.reports} reports

                    </p>

                </div>

                <div className="bg-white shadow rounded-xl p-6">

                    <h2 className="text-gray-500">

                        Latest Report

                    </h2>

                    <p className="font-semibold mt-2">

                        {stats.latest_report?.research_topic}

                    </p>

                    <p>

                        Version {stats.latest_report?.version ?? "-"}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Statistics;