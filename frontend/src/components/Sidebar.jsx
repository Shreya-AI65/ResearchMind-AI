import { NavLink } from "react-router-dom";
import {
    FiHome,
    FiPlusCircle,
    FiFileText,
    FiSearch,
    FiBarChart2,
    FiSettings,
    FiMoon,
    FiSun,
} from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";

function Sidebar() {
    const { darkMode, toggleDarkMode } = useTheme();

    const menuItems = [
        { name: "Dashboard", path: "/", icon: FiHome },
        { name: "Generate Report", path: "/generate-report", icon: FiPlusCircle },
        { name: "Report History", path: "/report-history", icon: FiFileText },
        { name: "Search Reports", path: "/search-reports", icon: FiSearch },
        { name: "Statistics", path: "/statistics", icon: FiBarChart2 },
        { name: "Settings", path: "/settings", icon: FiSettings },
    ];

    return (
        <aside
            className={`w-64 min-h-screen flex flex-col border-r transition-colors duration-300
            ${
                darkMode
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-gray-200 text-gray-800"
            }`}
        >
            {/* Logo */}
            <div
                className={`p-6 border-b ${
                    darkMode ? "border-slate-700" : "border-gray-100"
                }`}
            >
                <h1 className="text-xl font-bold text-sky-500">
                    ResearchMind AI
                </h1>

                <p
                    className={`text-xs mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-400"
                    }`}
                >
                    AI Research Assistant
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <div className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? "bg-sky-500 text-white shadow-sm"
                                            : darkMode
                                            ? "text-gray-300 hover:bg-slate-800 hover:text-sky-400"
                                            : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                                    }`
                                }
                            >
                                <Icon size={20} />

                                <span className="font-medium">
                                    {item.name}
                                </span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            {/* Dark Mode */}
            <div
                className={`p-4 border-t ${
                    darkMode ? "border-slate-700" : "border-gray-100"
                }`}
            >
                <button
                    onClick={toggleDarkMode}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        darkMode
                            ? "bg-slate-800 text-gray-200 hover:bg-slate-700"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    <div className="flex items-center gap-3">
                        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}

                        <span className="font-medium">
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </span>
                    </div>
                </button>
            </div>

            {/* Footer */}
            <div
                className={`p-4 border-t ${
                    darkMode ? "border-slate-700" : "border-gray-100"
                }`}
            >
                <p className="text-xs text-gray-400 text-center">
                    ResearchMind AI
                </p>
            </div>
        </aside>
    );
}

export default Sidebar;