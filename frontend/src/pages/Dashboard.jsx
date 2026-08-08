import { Link } from "react-router-dom";
import {
    FiFileText,
    FiSearch,
    FiBarChart2,
    FiPlus,
    FiClock,
    FiArrowRight,
} from "react-icons/fi";

function Dashboard() {
    return (
        <div className="min-h-screen bg-sky-50 p-6 md:p-8">

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 text-sm">
                                Total Reports
                            </p>

                            <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                —
                            </h3>
                        </div>

                        <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">
                            <FiFileText size={22} />
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 text-sm">
                                Research Topics
                            </p>

                            <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                —
                            </h3>
                        </div>

                        <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">
                            <FiSearch size={22} />
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 text-sm">
                                Latest Activity
                            </p>

                            <h3 className="text-lg font-bold text-gray-800 mt-2">
                                Research
                            </h3>
                        </div>

                        <div className="bg-sky-100 text-sky-600 p-3 rounded-xl">
                            <FiClock size={22} />
                        </div>

                    </div>
                </div>

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

            </div>

        </div>
    );
}

export default Dashboard;