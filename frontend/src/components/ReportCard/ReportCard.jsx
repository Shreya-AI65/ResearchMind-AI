function ReportCard({ topic, version, date }) {

    return (

        <div className="bg-white shadow rounded-xl p-5">

            <h2 className="text-xl font-bold">
                {topic}
            </h2>

            <p className="text-gray-500 mt-2">
                Version : {version}
            </p>

            <p className="text-gray-500">
                {date}
            </p>

        </div>

    );

}

export default ReportCard;