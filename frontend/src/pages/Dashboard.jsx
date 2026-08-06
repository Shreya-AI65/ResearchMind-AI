import {
    FaFileAlt,
    FaHistory,
    FaSearch,
    FaChartBar
} from "react-icons/fa";

function Dashboard() {

    const cards = [

        {
            title: "Generate Report",
            description: "Generate AI-powered research reports.",
            icon: <FaFileAlt size={35} />,
            color: "bg-sky-500"
        },

        {
            title: "Report History",
            description: "View previously generated reports.",
            icon: <FaHistory size={35} />,
            color: "bg-blue-500"
        },

        {
            title: "Search Reports",
            description: "Search reports by topic.",
            icon: <FaSearch size={35} />,
            color: "bg-cyan-500"
        },

        {
            title: "Statistics",
            description: "View report analytics.",
            icon: <FaChartBar size={35} />,
            color: "bg-indigo-500"
        }

    ];

    return (

        <div>

            <h1 className="text-4xl font-bold text-sky-600">

                Welcome to ResearchMind AI

            </h1>

            <p className="text-gray-600 mt-2">

                Intelligent Multi-Agent Research Assistant

            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                {cards.map((card, index) => (

                    <div

                        key={index}

                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 cursor-pointer"

                    >

                        <div className={`${card.color} text-white rounded-full w-16 h-16 flex items-center justify-center`}>

                            {card.icon}

                        </div>

                        <h2 className="text-xl font-semibold mt-5">

                            {card.title}

                        </h2>

                        <p className="text-gray-600 mt-2">

                            {card.description}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Dashboard;