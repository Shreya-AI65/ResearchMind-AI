import {
    FaHome,
    FaFileAlt,
    FaHistory,
    FaChartBar,
    FaSearch,
    FaCog,
    FaBookOpen
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {

    const menu = [
        {
            name: "Dashboard",
            path: "/",
            icon: <FaHome />
        },
        {
            name: "Generate Report",
            path: "/generate",
            icon: <FaFileAlt />
        },
        {
            name: "Report History",
            path: "/history",
            icon: <FaHistory />
        },
        {
            name: "Report Viewer",
            path: "/viewer",
            icon: <FaBookOpen />
        },
        {
            name: "Statistics",
            path: "/statistics",
            icon: <FaChartBar />
        },
        {
            name: "Search",
            path: "/search",
            icon: <FaSearch />
        },
        {
            name: "Settings",
            path: "/settings",
            icon: <FaCog />
        }
    ];

    return (

        <aside className="w-64 bg-slate-900 text-white min-h-screen">

            <h2 className="text-2xl font-bold p-6">
                ResearchMind AI
            </h2>

            <nav>

                {
                    menu.map((item) => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center gap-3 px-6 py-4 transition

                                ${
                                    isActive
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-700"
                                }`

                            }

                        >

                            {item.icon}

                            {item.name}

                        </NavLink>

                    ))
                }

            </nav>

        </aside>

    );

}

export default Sidebar;