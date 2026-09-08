import { useLocation, useNavigate } from "react-router-dom";
import {
    FiHome,
    FiPlusCircle,
    FiFileText,
    FiSearch,
    FiBarChart2,
    FiSettings,
    FiHelpCircle,
    FiMoon,
    FiSun,
    FiCpu,
    FiChevronRight,
} from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const { darkMode, toggleDarkMode } = useTheme();

    const navigationItems = [
        {
            label: "Dashboard",
            path: "/",
            icon: FiHome,
        },
        {
            label: "Generate Report",
            path: "/generate-report",
            icon: FiPlusCircle,
        },
        {
            label: "Report History",
            path: "/report-history",
            icon: FiFileText,
        },
        {
            label: "Search Reports",
            path: "/search-reports",
            icon: FiSearch,
        },
        {
            label: "Statistics",
            path: "/statistics",
            icon: FiBarChart2,
        },
    ];

    const bottomItems = [
        {
            label: "Settings",
            path: "/settings",
            icon: FiSettings,
        },
    ];

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }

        return location.pathname === path;
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <aside
            className="
                fixed
                left-0
                top-0
                z-50
                flex
                h-screen
                w-[270px]
                flex-col
                overflow-hidden
                border-r
                border-slate-800/80
                bg-[#071126]
                text-white
                shadow-[8px_0_40px_rgba(0,0,0,0.25)]
            "
        >
            {/* =========================================
                BRAND
            ========================================= */}

            <div className="relative px-6 pt-7 pb-6">

                {/* Glow */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-10
                        -top-10
                        h-32
                        w-32
                        rounded-full
                        bg-blue-500/20
                        blur-3xl
                    "
                />

                <div className="relative flex items-center gap-3">

                    {/* AI Logo */}

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-blue-500
                            via-indigo-500
                            to-purple-600
                            shadow-[0_0_25px_rgba(59,130,246,0.35)]
                        "
                    >
                        <FiCpu
                            size={24}
                            className="text-white"
                        />
                    </div>

                    {/* Brand */}

                    <div>
                        <h1
                            className="
                                text-xl
                                font-extrabold
                                tracking-tight
                                text-white
                            "
                        >
                            ResearchMind
                            <span
                                className="
                                    ml-1
                                    bg-gradient-to-r
                                    from-sky-400
                                    to-violet-400
                                    bg-clip-text
                                    text-transparent
                                "
                            >
                                AI
                            </span>
                        </h1>

                        <p
                            className="
                                mt-1
                                text-xs
                                font-medium
                                text-slate-400
                            "
                        >
                            AI Research Assistant
                        </p>
                    </div>
                </div>
            </div>

            {/* Divider */}

            <div className="mx-6 h-px bg-slate-800" />

            {/* =========================================
                MAIN NAVIGATION
            ========================================= */}

            <nav className="flex-1 px-4 py-6">

                <p
                    className="
                        mb-3
                        px-3
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-slate-500
                    "
                >
                    Workspace
                </p>

                <div className="space-y-2">

                    {navigationItems.map((item) => {

                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <button
                                key={item.path}
                                type="button"
                                onClick={() =>
                                    handleNavigation(item.path)
                                }
                                className={`
                                    group
                                    relative
                                    flex
                                    w-full
                                    items-center
                                    gap-4
                                    rounded-2xl
                                    px-4
                                    py-3.5
                                    text-left
                                    transition-all
                                    duration-200

                                    ${
                                        active
                                            ? `
                                                bg-gradient-to-r
                                                from-sky-500
                                                via-blue-500
                                                to-violet-600
                                                text-white
                                                shadow-[0_8px_25px_rgba(59,130,246,0.28)]
                                            `
                                            : `
                                                text-slate-300
                                                hover:bg-slate-800/70
                                                hover:text-white
                                            `
                                    }
                                `}
                            >

                                {/* Active glow */}

                                {active && (
                                    <span
                                        className="
                                            absolute
                                            -left-1
                                            top-1/2
                                            h-8
                                            w-1
                                            -translate-y-1/2
                                            rounded-full
                                            bg-sky-300
                                            shadow-[0_0_12px_rgba(125,211,252,0.9)]
                                        "
                                    />
                                )}

                                {/* Icon */}

                                <span
                                    className={`
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        transition-all
                                        duration-200

                                        ${
                                            active
                                                ? "bg-white/15"
                                                : "bg-slate-800/60 group-hover:bg-slate-700"
                                        }
                                    `}
                                >
                                    <Icon size={20} />
                                </span>

                                {/* Label */}

                                <span
                                    className="
                                        flex-1
                                        text-sm
                                        font-semibold
                                    "
                                >
                                    {item.label}
                                </span>

                                {/* Arrow */}

                                <FiChevronRight
                                    size={16}
                                    className={`
                                        transition-all
                                        duration-200

                                        ${
                                            active
                                                ? "translate-x-0 opacity-100"
                                                : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                                        }
                                    `}
                                />
                            </button>
                        );
                    })}
                </div>

                {/* =========================================
                    MANAGEMENT
                ========================================= */}

                <p
                    className="
                        mb-3
                        mt-8
                        px-3
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-slate-500
                    "
                >
                    Management
                </p>

                <div className="space-y-2">

                    {bottomItems.map((item) => {

                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <button
                                key={item.path}
                                type="button"
                                onClick={() =>
                                    handleNavigation(item.path)
                                }
                                className={`
                                    group
                                    flex
                                    w-full
                                    items-center
                                    gap-4
                                    rounded-2xl
                                    px-4
                                    py-3.5
                                    text-left
                                    transition-all
                                    duration-200

                                    ${
                                        active
                                            ? `
                                                bg-gradient-to-r
                                                from-sky-500
                                                to-violet-600
                                                text-white
                                                shadow-lg
                                            `
                                            : `
                                                text-slate-300
                                                hover:bg-slate-800/70
                                                hover:text-white
                                            `
                                    }
                                `}
                            >
                                <span
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-slate-800/60
                                    "
                                >
                                    <Icon size={19} />
                                </span>

                                <span
                                    className="
                                        flex-1
                                        text-sm
                                        font-semibold
                                    "
                                >
                                    {item.label}
                                </span>

                                <FiChevronRight
                                    size={16}
                                    className="
                                        opacity-40
                                        transition-transform
                                        group-hover:translate-x-1
                                    "
                                />
                            </button>
                        );
                    })}

                    {/* Help */}

                    <button
                        type="button"
                        className="
                            group
                            flex
                            w-full
                            items-center
                            gap-4
                            rounded-2xl
                            px-4
                            py-3.5
                            text-left
                            text-slate-300
                            transition-all
                            duration-200
                            hover:bg-slate-800/70
                            hover:text-white
                        "
                    >
                        <span
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                bg-slate-800/60
                            "
                        >
                            <FiHelpCircle size={19} />
                        </span>

                        <span className="flex-1 text-sm font-semibold">
                            Help & Support
                        </span>
                    </button>
                </div>
            </nav>

            {/* =========================================
                DARK MODE
            ========================================= */}

            <div className="px-4 pb-4">

                <button
                    type="button"
                    onClick={toggleDarkMode}
                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        border-slate-700/70
                        bg-slate-900/70
                        px-4
                        py-3
                        text-left
                        transition-all
                        duration-200
                        hover:border-blue-500/50
                        hover:bg-slate-800
                    "
                >
                    <span
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-slate-800
                        "
                    >
                        {darkMode ? (
                            <FiMoon
                                size={18}
                                className="text-blue-400"
                            />
                        ) : (
                            <FiSun
                                size={18}
                                className="text-amber-400"
                            />
                        )}
                    </span>

                    <span className="flex-1">
                        <span
                            className="
                                block
                                text-sm
                                font-semibold
                                text-white
                            "
                        >
                            {darkMode
                                ? "Dark Mode"
                                : "Light Mode"}
                        </span>

                        <span
                            className="
                                mt-0.5
                                block
                                text-[10px]
                                text-slate-500
                            "
                        >
                            Appearance
                        </span>
                    </span>

                    {/* Toggle */}

                    <span
                        className={`
                            relative
                            h-6
                            w-11
                            rounded-full
                            transition-colors
                            duration-200
                            ${
                                darkMode
                                    ? "bg-gradient-to-r from-sky-500 to-violet-600"
                                    : "bg-slate-700"
                            }
                        `}
                    >
                        <span
                            className={`
                                absolute
                                top-1
                                h-4
                                w-4
                                rounded-full
                                bg-white
                                shadow-md
                                transition-transform
                                duration-200
                                ${
                                    darkMode
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }
                            `}
                        />
                    </span>
                </button>
            </div>

            {/* =========================================
                USER PROFILE
            ========================================= */}

            <div className="border-t border-slate-800 px-4 py-4">

                <div
                    className="
                        group
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        rounded-2xl
                        p-2
                        transition
                        hover:bg-slate-800/70
                    "
                >

                    {/* Avatar */}

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-sky-400
                            to-violet-600
                            text-sm
                            font-bold
                            text-white
                            shadow-[0_0_18px_rgba(59,130,246,0.35)]
                        "
                    >
                        SS
                    </div>

                    {/* User */}

                    <div className="min-w-0 flex-1">

                        <p
                            className="
                                truncate
                                text-sm
                                font-semibold
                                text-white
                            "
                        >
                            Shreya Singh
                        </p>

                        <p
                            className="
                                mt-0.5
                                text-[11px]
                                text-slate-500
                            "
                        >
                            Researcher
                        </p>
                    </div>

                    <FiChevronRight
                        size={17}
                        className="
                            text-slate-500
                            transition-transform
                            group-hover:translate-x-1
                        "
                    />
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;