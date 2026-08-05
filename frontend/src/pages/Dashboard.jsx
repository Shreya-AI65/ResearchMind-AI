import AnalyticsCard from "../components/AnalyticsCard/AnalyticsCard";

function Dashboard() {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">

                <AnalyticsCard
                    title="Reports"
                    value="0"
                />

                <AnalyticsCard
                    title="Topics"
                    value="0"
                />

                <AnalyticsCard
                    title="Generated Today"
                    value="0"
                />

            </div>

        </div>

    );

}

export default Dashboard;