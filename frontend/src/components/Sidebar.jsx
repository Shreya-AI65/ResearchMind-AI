import { Link } from "react-router-dom";

import {
    FaHome,
    FaFileAlt,
    FaHistory,
    FaSearch,
    FaChartBar,
    FaCog
} from "react-icons/fa";

function Sidebar() {

    return (

        <div className="bg-sky-600 w-64 text-white min-h-screen p-6">

            <h2 className="text-2xl font-bold mb-10">

                ResearchMind

            </h2>

            <nav className="space-y-5">

                <Link
                    className="flex items-center gap-3 hover:text-sky-200"
                    to="/"
                >
                    <FaHome />
                    Dashboard
                </Link>

                <Link
                    className="flex items-center gap-3 hover:text-sky-200"
                    to="/generate"
                >
                    <FaFileAlt />
                    Generate Report
                </Link>

                <Link
                    className="flex items-center gap-3 hover:text-sky-200"
                    to="/history"
                >
                    <FaHistory />
                    History
                </Link>

                <Link
                    className="flex items-center gap-3 hover:text-sky-200"
                    to="/search"
                >
                    <FaSearch />
                    Search
                </Link>

                <Link
                    className="flex items-center gap-3 hover:text-sky-200"
                    to="/statistics"
                >
                    <FaChartBar />
                    Statistics
                </Link>

                <Link
                    className="flex items-center gap-3 hover:text-sky-200"
                    to="/settings"
                >
                    <FaCog />
                    Settings
                </Link>

            </nav>

        </div>

    );

}

export default Sidebar;