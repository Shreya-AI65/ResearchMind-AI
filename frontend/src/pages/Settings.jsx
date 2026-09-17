import { useState } from "react";
import {
    FiMoon,
    FiSun,
    FiMonitor,
    FiSliders,
    FiFileText,
    FiClock,
    FiCheck,
    FiBookOpen,
} from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";

function Settings() {

    const { darkMode, toggleDarkMode } = useTheme();

    // --------------------------------
    // Research Preferences
    // --------------------------------

    const [papersPerSearch, setPapersPerSearch] = useState(() => {
        return localStorage.getItem("papersPerSearch") || "10";
    });

    const [recentPapers, setRecentPapers] = useState(() => {
        return localStorage.getItem("recentPapers") === "true";
    });

    const [researchArea, setResearchArea] = useState(() => {
        return localStorage.getItem("researchArea") || "General";
    });


    // --------------------------------
    // Preference Handlers
    // --------------------------------

    const updatePapersPerSearch = (value) => {
        setPapersPerSearch(value);
        localStorage.setItem("papersPerSearch", value);
    };

    const updateRecentPapers = (value) => {
        setRecentPapers(value);
        localStorage.setItem("recentPapers", value);
    };

    const updateResearchArea = (value) => {
        setResearchArea(value);
        localStorage.setItem("researchArea", value);
    };


    return (

        <div
            className="
                min-h-screen
                bg-sky-50
                dark:bg-slate-950
                p-6
                md:p-8
                transition-colors
                duration-300
            "
        >

            {/* ========================================
                HEADER
            ======================================== */}

            <div className="mb-8">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-br
                            from-sky-500
                            to-blue-600
                            text-white
                            shadow-lg
                        "
                    >
                        <FiSliders size={22} />
                    </div>

                    <div>

                        <h1
                            className="
                                text-3xl
                                font-bold
                                text-slate-900
                                dark:text-white
                            "
                        >
                            Settings
                        </h1>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            Customize your ResearchMind AI experience.
                        </p>

                    </div>

                </div>

            </div>


            {/* ========================================
                MAIN CONTENT
            ======================================== */}

            <div className="max-w-5xl space-y-6">


                {/* ========================================
                    APPEARANCE
                ======================================== */}

                <section
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        dark:border-slate-800
                        bg-white
                        dark:bg-slate-900
                        shadow-sm
                        p-6
                        transition-all
                        duration-300
                        hover:shadow-md
                    "
                >

                    {/* Section Header */}

                    <div className="flex items-center gap-3 mb-6">

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-sky-100
                                dark:bg-sky-500/10
                                text-sky-600
                                dark:text-sky-400
                            "
                        >

                            {darkMode ? (
                                <FiMoon size={21} />
                            ) : (
                                <FiSun size={21} />
                            )}

                        </div>

                        <div>

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                    text-slate-900
                                    dark:text-white
                                "
                            >
                                Appearance
                            </h2>

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                Customize how ResearchMind AI looks.
                            </p>

                        </div>

                    </div>


                    {/* Theme Setting */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            rounded-xl
                            border
                            border-slate-200
                            dark:border-slate-800
                            bg-slate-50
                            dark:bg-slate-950/50
                            p-4
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-white
                                    dark:bg-slate-800
                                    text-slate-600
                                    dark:text-slate-300
                                    shadow-sm
                                "
                            >

                                {darkMode ? (
                                    <FiMoon />
                                ) : (
                                    <FiSun />
                                )}

                            </div>


                            <div>

                                <p
                                    className="
                                        font-medium
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    Theme
                                </p>

                                <p
                                    className="
                                        text-sm
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    {darkMode
                                        ? "Dark mode is currently enabled."
                                        : "Light mode is currently enabled."
                                    }
                                </p>

                            </div>

                        </div>


                        {/* Toggle */}

                        <button
                            type="button"
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                            className={`
                                relative
                                h-7
                                w-12
                                shrink-0
                                rounded-full
                                transition-colors
                                duration-300
                                focus:outline-none
                                focus:ring-2
                                focus:ring-sky-400
                                focus:ring-offset-2
                                dark:focus:ring-offset-slate-900
                                ${
                                    darkMode
                                        ? "bg-sky-500"
                                        : "bg-slate-300"
                                }
                            `}
                        >

                            <span
                                className={`
                                    absolute
                                    top-1
                                    h-5
                                    w-5
                                    rounded-full
                                    bg-white
                                    shadow
                                    transition-transform
                                    duration-300
                                    ${
                                        darkMode
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    }
                                `}
                            />

                        </button>

                    </div>

                </section>



                {/* ========================================
                    RESEARCH PREFERENCES
                ======================================== */}

                <section
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        dark:border-slate-800
                        bg-white
                        dark:bg-slate-900
                        shadow-sm
                        p-6
                        transition-all
                        duration-300
                        hover:shadow-md
                    "
                >

                    {/* Section Header */}

                    <div className="flex items-center gap-3 mb-6">

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-violet-100
                                dark:bg-violet-500/10
                                text-violet-600
                                dark:text-violet-400
                            "
                        >
                            <FiBookOpen size={21} />
                        </div>


                        <div>

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                    text-slate-900
                                    dark:text-white
                                "
                            >
                                Research Preferences
                            </h2>

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                Control how ResearchMind AI handles research searches.
                            </p>

                        </div>

                    </div>


                    <div className="space-y-4">


                        {/* ========================================
                            PAPERS PER SEARCH
                        ======================================== */}

                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                md:items-center
                                md:justify-between
                                gap-4
                                rounded-xl
                                border
                                border-slate-200
                                dark:border-slate-800
                                bg-slate-50
                                dark:bg-slate-950/50
                                p-4
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-white
                                        dark:bg-slate-800
                                        text-slate-600
                                        dark:text-slate-300
                                        shadow-sm
                                    "
                                >
                                    <FiFileText />
                                </div>


                                <div>

                                    <p
                                        className="
                                            font-medium
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        Papers per search
                                    </p>

                                    <p
                                        className="
                                            text-sm
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        Number of research papers to retrieve.
                                    </p>

                                </div>

                            </div>


                            <select
                                value={papersPerSearch}
                                onChange={(event) =>
                                    updatePapersPerSearch(
                                        event.target.value
                                    )
                                }
                                className="
                                    w-full
                                    md:w-32
                                    rounded-lg
                                    border
                                    border-slate-300
                                    dark:border-slate-700
                                    bg-white
                                    dark:bg-slate-800
                                    px-3
                                    py-2
                                    text-sm
                                    text-slate-900
                                    dark:text-white
                                    outline-none
                                    focus:ring-2
                                    focus:ring-sky-400
                                "
                            >

                                <option value="5">
                                    5 papers
                                </option>

                                <option value="10">
                                    10 papers
                                </option>

                                <option value="20">
                                    20 papers
                                </option>

                            </select>

                        </div>



                        {/* ========================================
                            RECENT PAPERS
                        ======================================== */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-4
                                rounded-xl
                                border
                                border-slate-200
                                dark:border-slate-800
                                bg-slate-50
                                dark:bg-slate-950/50
                                p-4
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-white
                                        dark:bg-slate-800
                                        text-slate-600
                                        dark:text-slate-300
                                        shadow-sm
                                    "
                                >
                                    <FiClock />
                                </div>


                                <div>

                                    <p
                                        className="
                                            font-medium
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        Prefer recent papers
                                    </p>

                                    <p
                                        className="
                                            text-sm
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        Prioritize newer research papers when searching.
                                    </p>

                                </div>

                            </div>


                            {/* Toggle */}

                            <button
                                type="button"
                                onClick={() =>
                                    updateRecentPapers(
                                        !recentPapers
                                    )
                                }
                                aria-label="Toggle recent papers preference"
                                className={`
                                    relative
                                    h-7
                                    w-12
                                    shrink-0
                                    rounded-full
                                    transition-colors
                                    duration-300
                                    ${
                                        recentPapers
                                            ? "bg-violet-500"
                                            : "bg-slate-300"
                                    }
                                `}
                            >

                                <span
                                    className={`
                                        absolute
                                        top-1
                                        h-5
                                        w-5
                                        rounded-full
                                        bg-white
                                        shadow
                                        transition-transform
                                        duration-300
                                        ${
                                            recentPapers
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                        }
                                    `}
                                />

                            </button>

                        </div>



                        {/* ========================================
                            RESEARCH AREA
                        ======================================== */}

                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                md:items-center
                                md:justify-between
                                gap-4
                                rounded-xl
                                border
                                border-slate-200
                                dark:border-slate-800
                                bg-slate-50
                                dark:bg-slate-950/50
                                p-4
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-white
                                        dark:bg-slate-800
                                        text-slate-600
                                        dark:text-slate-300
                                        shadow-sm
                                    "
                                >
                                    <FiSliders />
                                </div>


                                <div>

                                    <p
                                        className="
                                            font-medium
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        Research area
                                    </p>

                                    <p
                                        className="
                                            text-sm
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        Select your preferred research domain.
                                    </p>

                                </div>

                            </div>


                            <select
                                value={researchArea}
                                onChange={(event) =>
                                    updateResearchArea(
                                        event.target.value
                                    )
                                }
                                className="
                                    w-full
                                    md:w-52
                                    rounded-lg
                                    border
                                    border-slate-300
                                    dark:border-slate-700
                                    bg-white
                                    dark:bg-slate-800
                                    px-3
                                    py-2
                                    text-sm
                                    text-slate-900
                                    dark:text-white
                                    outline-none
                                    focus:ring-2
                                    focus:ring-violet-400
                                "
                            >

                                <option value="General">
                                    General
                                </option>

                                <option value="Artificial Intelligence">
                                    Artificial Intelligence
                                </option>

                                <option value="Machine Learning">
                                    Machine Learning
                                </option>

                                <option value="Agentic AI">
                                    Agentic AI
                                </option>

                                <option value="Multi-Agent Systems">
                                    Multi-Agent Systems
                                </option>

                                <option value="RAG">
                                    RAG
                                </option>

                                <option value="Scientific Document Intelligence">
                                    Scientific Document Intelligence
                                </option>

                            </select>

                        </div>

                    </div>

                </section>



                {/* ========================================
                    CURRENT PREFERENCES
                ======================================== */}

                <section
                    className="
                        rounded-2xl
                        border
                        border-emerald-200
                        dark:border-emerald-900/40
                        bg-emerald-50
                        dark:bg-emerald-500/5
                        p-5
                    "
                >

                    <div className="flex items-start gap-3">

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-emerald-100
                                dark:bg-emerald-500/10
                                text-emerald-600
                                dark:text-emerald-400
                            "
                        >
                            <FiCheck />
                        </div>


                        <div>

                            <p
                                className="
                                    font-medium
                                    text-emerald-800
                                    dark:text-emerald-300
                                "
                            >
                                Preferences saved automatically
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-emerald-700
                                    dark:text-emerald-400
                                "
                            >
                                {papersPerSearch} papers per search ·{" "}
                                {recentPapers
                                    ? "Recent papers prioritized"
                                    : "Standard paper ordering"
                                }{" "}
                                · {researchArea}
                            </p>

                        </div>

                    </div>

                </section>



                {/* ========================================
                    MORE SETTINGS
                ======================================== */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-dashed
                        border-slate-300
                        dark:border-slate-700
                        p-6
                        text-center
                    "
                >

                    <div className="flex justify-center mb-3">

                        <FiMonitor
                            className="
                                text-slate-400
                                dark:text-slate-500
                            "
                            size={28}
                        />

                    </div>


                    <p
                        className="
                            font-medium
                            text-slate-700
                            dark:text-slate-300
                        "
                    >
                        More settings are coming soon
                    </p>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                            dark:text-slate-500
                        "
                    >
                        Profile, notifications, AI preferences and other
                        options will be added here.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Settings;