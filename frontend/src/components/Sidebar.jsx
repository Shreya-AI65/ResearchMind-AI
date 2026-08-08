import { NavLink } from "react-router-dom";

import {
    FiHome,
    FiPlusCircle,
    FiFileText,
    FiSearch,
    FiBarChart2,
    FiSettings,
} from "react-icons/fi";

function Sidebar() {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/",
            icon: FiHome,
        },
        {
            name: "Generate Report",
            path: "/generate-report",
            icon: FiPlusCircle,
        },
        {
            name: "Report History",
            path: "/report-history",
            icon: FiFileText,
        },
        {
            name: "Search Reports",
            path: "/search-reports",
            icon: FiSearch,
        },
        {
            name: "Statistics",
            path: "/statistics",
            icon: FiBarChart2,
        },
        {
            name: "Settings",
            path: "/settings",
            icon: FiSettings,
        },
    ];

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">

            {/* Logo */}

            <div className="p-6 border-b border-gray-100">

                <h1 className="text-xl font-bold text-sky-600">
                    ResearchMind AI
                </h1>

                <p className="text-xs text-gray-400 mt-1">
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

            {/* Footer */}

            <div className="p-4 border-t border-gray-100">

                <p className="text-xs text-gray-400 text-center">
                    ResearchMind AI
                </p>

            </div>

        </aside>
    );
}

export default Sidebar;