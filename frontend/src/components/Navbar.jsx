import { useEffect, useRef, useState } from "react";
import {
    FiBell,
    FiChevronDown,
    FiFileText,
    FiMoon,
    FiSearch,
    FiSettings,
    FiSun,
    FiUser,
    FiX,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const { darkMode, toggleDarkMode } = useTheme();

    const [search, setSearch] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    /* ==========================================
       CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
    ========================================== */

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfile(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /* ==========================================
       SEARCH
    ========================================== */

    const handleSearch = (event) => {
        event.preventDefault();

        const cleanSearch = search.trim();

        if (!cleanSearch) {
            navigate("/search-reports");
            return;
        }

        navigate(
            `/search-reports?topic=${encodeURIComponent(
                cleanSearch
            )}`
        );
    };

    const clearSearch = () => {
        setSearch("");
    };

    /* ==========================================
       PROFILE
    ========================================== */

    const openSettings = () => {
        setShowProfile(false);
        navigate("/settings");
    };

    const openHistory = () => {
        setShowProfile(false);
        navigate("/report-history");
    };

    /* ==========================================
       SEARCH PLACEHOLDER BASED ON PAGE
    ========================================== */

    const getPlaceholder = () => {
        if (location.pathname === "/search-reports") {
            return "Search reports...";
        }

        if (location.pathname === "/report-history") {
            return "Search your reports...";
        }

        return "Search research, reports, papers...";
    };

    return (
        <header
            className="
                sticky
                top-0
                z-40
                h-[76px]
                border-b
                border-slate-200
                bg-white/90
                backdrop-blur-xl
                dark:border-slate-800
                dark:bg-[#071126]/95
            "
        >
            <div
                className="
                    flex
                    h-full
                    items-center
                    gap-5
                    px-5
                    sm:px-6
                    lg:px-7
                "
            >
                {/* ======================================
                    MOBILE BRAND
                ====================================== */}

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-2.5
                        lg:hidden
                    "
                >
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-br
                            from-sky-400
                            via-blue-500
                            to-violet-600
                            text-sm
                            font-bold
                            text-white
                            shadow-lg
                            shadow-blue-500/20
                        "
                    >
                        R
                    </div>

                    <div className="hidden sm:block">
                        <p
                            className="
                                text-sm
                                font-bold
                                text-slate-900
                                dark:text-white
                            "
                        >
                            ResearchMind{" "}
                            <span
                                className="
                                    text-violet-500
                                "
                            >
                                AI
                            </span>
                        </p>

                        <p
                            className="
                                text-[10px]
                                text-slate-400
                            "
                        >
                            AI Research Platform
                        </p>
                    </div>
                </button>

                {/* ======================================
                    SEARCH
                ====================================== */}

                <form
                    onSubmit={handleSearch}
                    className="
                        relative
                        flex-1
                        lg:max-w-[720px]
                    "
                >
                    <FiSearch
                        size={21}
                        className="
                            pointer-events-none
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            dark:text-slate-500
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder={getPlaceholder()}
                        className="
                            h-[54px]
                            w-full
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            pl-13
                            pr-24
                            text-sm
                            font-medium
                            text-slate-700
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-slate-400
                            hover:border-slate-300
                            focus:border-sky-400
                            focus:bg-white
                            focus:ring-4
                            focus:ring-sky-500/10
                            dark:border-slate-700
                            dark:bg-slate-900/70
                            dark:text-slate-200
                            dark:placeholder:text-slate-500
                            dark:hover:border-slate-600
                            dark:focus:border-sky-500
                            dark:focus:bg-slate-900
                        "
                    />

                    {/* Clear */}

                    {search && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="
                                absolute
                                right-14
                                top-1/2
                                flex
                                h-7
                                w-7
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-lg
                                text-slate-400
                                transition
                                hover:bg-slate-200
                                hover:text-slate-700
                                dark:hover:bg-slate-800
                                dark:hover:text-white
                            "
                        >
                            <FiX size={15} />
                        </button>
                    )}

                    {/* Shortcut */}

                    <button
                        type="submit"
                        className="
                            absolute
                            right-3
                            top-1/2
                            flex
                            h-8
                            -translate-y-1/2
                            items-center
                            gap-1
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            px-2.5
                            text-[11px]
                            font-semibold
                            text-slate-400
                            shadow-sm
                            transition
                            hover:border-sky-300
                            hover:text-sky-500
                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-slate-500
                            dark:hover:border-sky-500
                            dark:hover:text-sky-400
                        "
                    >
                        <span>⌘</span>
                        <span>K</span>
                    </button>
                </form>

                {/* ======================================
                    RIGHT SIDE
                ====================================== */}

                <div className="ml-auto flex items-center gap-3">
                    {/* ==================================
                        NOTIFICATIONS
                    ================================== */}

                    <div
                        ref={notificationRef}
                        className="relative"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setShowNotifications(
                                    (previous) => !previous
                                );
                                setShowProfile(false);
                            }}
                            className="
                                relative
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                text-slate-600
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                hover:border-sky-300
                                hover:text-sky-500
                                hover:shadow-lg
                                hover:shadow-sky-500/10
                                dark:border-slate-700
                                dark:bg-slate-900
                                dark:text-slate-300
                                dark:hover:border-sky-500/40
                                dark:hover:text-sky-400
                            "
                            aria-label="Notifications"
                        >
                            <FiBell size={20} />

                            {/* Notification dot */}

                            <span
                                className="
                                    absolute
                                    right-2.5
                                    top-2
                                    h-2.5
                                    w-2.5
                                    rounded-full
                                    bg-sky-500
                                    ring-2
                                    ring-white
                                    dark:ring-slate-900
                                "
                            />
                        </button>

                        {showNotifications && (
                            <div
                                className="
                                    absolute
                                    right-0
                                    top-[60px]
                                    z-50
                                    w-[330px]
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-2xl
                                    shadow-slate-900/10
                                    dark:border-slate-700
                                    dark:bg-slate-900
                                "
                            >
                                <div
                                    className="
                                        border-b
                                        border-slate-100
                                        px-5
                                        py-4
                                        dark:border-slate-800
                                    "
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-slate-900
                                                    dark:text-white
                                                "
                                            >
                                                Notifications
                                            </h3>

                                            <p
                                                className="
                                                    mt-0.5
                                                    text-xs
                                                    text-slate-400
                                                "
                                            >
                                                Research workspace updates
                                            </p>
                                        </div>

                                        <span
                                            className="
                                                rounded-full
                                                bg-sky-50
                                                px-2
                                                py-1
                                                text-[10px]
                                                font-bold
                                                text-sky-600
                                                dark:bg-sky-500/10
                                                dark:text-sky-400
                                            "
                                        >
                                            1 new
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowNotifications(false);
                                        navigate(
                                            "/report-history"
                                        );
                                    }}
                                    className="
                                        flex
                                        w-full
                                        gap-3
                                        p-4
                                        text-left
                                        transition
                                        hover:bg-slate-50
                                        dark:hover:bg-slate-800/60
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-sky-50
                                            text-sky-500
                                            dark:bg-sky-500/10
                                            dark:text-sky-400
                                        "
                                    >
                                        <FiFileText size={17} />
                                    </div>

                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-slate-800
                                                dark:text-slate-100
                                            "
                                        >
                                            Report history updated
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-[11px]
                                                leading-5
                                                text-slate-400
                                            "
                                        >
                                            View your recently generated
                                            research reports.
                                        </p>
                                    </div>
                                </button>

                                <div
                                    className="
                                        border-t
                                        border-slate-100
                                        px-5
                                        py-3
                                        dark:border-slate-800
                                    "
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNotifications(
                                                false
                                            )
                                        }
                                        className="
                                            text-xs
                                            font-semibold
                                            text-sky-500
                                            hover:text-sky-600
                                        "
                                    >
                                        Mark as read
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Divider */}

                    <div
                        className="
                            hidden
                            h-10
                            w-px
                            bg-slate-200
                            dark:bg-slate-800
                            sm:block
                        "
                    />

                    {/* ==================================
                        PROFILE
                    ================================== */}

                    <div
                        ref={profileRef}
                        className="relative"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setShowProfile(
                                    (previous) => !previous
                                );
                                setShowNotifications(false);
                            }}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                px-2
                                py-1.5
                                transition
                                hover:bg-slate-50
                                dark:hover:bg-slate-900
                            "
                        >
                            {/* Avatar */}

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
                                    from-sky-400
                                    via-blue-500
                                    to-violet-600
                                    text-xs
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-blue-500/20
                                "
                            >
                                SS
                            </div>

                            {/* User */}

                            <div
                                className="
                                    hidden
                                    min-w-0
                                    text-left
                                    sm:block
                                "
                            >
                                <p
                                    className="
                                        truncate
                                        text-sm
                                        font-bold
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    Shreya Singh
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-[11px]
                                        text-slate-400
                                    "
                                >
                                    Researcher
                                </p>
                            </div>

                            <FiChevronDown
                                size={16}
                                className="
                                    hidden
                                    text-slate-400
                                    transition
                                    sm:block
                                "
                            />
                        </button>

                        {showProfile && (
                            <div
                                className="
                                    absolute
                                    right-0
                                    top-[60px]
                                    z-50
                                    w-[250px]
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-2xl
                                    shadow-slate-900/10
                                    dark:border-slate-700
                                    dark:bg-slate-900
                                "
                            >
                                {/* Profile header */}

                                <div
                                    className="
                                        border-b
                                        border-slate-100
                                        p-4
                                        dark:border-slate-800
                                    "
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="
                                                flex
                                                h-11
                                                w-11
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-gradient-to-br
                                                from-sky-400
                                                to-violet-600
                                                text-xs
                                                font-bold
                                                text-white
                                            "
                                        >
                                            SS
                                        </div>

                                        <div>
                                            <p
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-slate-900
                                                    dark:text-white
                                                "
                                            >
                                                Shreya Singh
                                            </p>

                                            <p
                                                className="
                                                    text-[11px]
                                                    text-slate-400
                                                "
                                            >
                                                Researcher
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* History */}

                                <button
                                    type="button"
                                    onClick={openHistory}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        text-left
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        transition
                                        hover:bg-slate-50
                                        dark:text-slate-200
                                        dark:hover:bg-slate-800
                                    "
                                >
                                    <FiFileText size={17} />

                                    Report History
                                </button>

                                {/* Settings */}

                                <button
                                    type="button"
                                    onClick={openSettings}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        text-left
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        transition
                                        hover:bg-slate-50
                                        dark:text-slate-200
                                        dark:hover:bg-slate-800
                                    "
                                >
                                    <FiSettings size={17} />

                                    Settings
                                </button>

                                {/* Theme */}

                                <button
                                    type="button"
                                    onClick={toggleDarkMode}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        border-t
                                        border-slate-100
                                        px-4
                                        py-3
                                        text-left
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        transition
                                        hover:bg-slate-50
                                        dark:border-slate-800
                                        dark:text-slate-200
                                        dark:hover:bg-slate-800
                                    "
                                >
                                    {darkMode ? (
                                        <FiSun
                                            size={17}
                                            className="text-amber-400"
                                        />
                                    ) : (
                                        <FiMoon
                                            size={17}
                                            className="text-blue-500"
                                        />
                                    )}

                                    {darkMode
                                        ? "Switch to Light Mode"
                                        : "Switch to Dark Mode"}
                                </button>

                                {/* Account */}

                                <div
                                    className="
                                        border-t
                                        border-slate-100
                                        p-3
                                        dark:border-slate-800
                                    "
                                >
                                    <button
                                        type="button"
                                        onClick={openSettings}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            bg-slate-50
                                            px-3
                                            py-2.5
                                            text-left
                                            text-xs
                                            font-semibold
                                            text-slate-500
                                            transition
                                            hover:bg-sky-50
                                            hover:text-sky-600
                                            dark:bg-slate-800
                                            dark:text-slate-400
                                            dark:hover:bg-sky-500/10
                                            dark:hover:text-sky-400
                                        "
                                    >
                                        <FiUser size={15} />

                                        Manage profile
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;