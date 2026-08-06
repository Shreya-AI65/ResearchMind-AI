import { useState } from "react";

import { generateReport } from "../services/reportService";

import {
    downloadPDF,
    downloadDOCX,
    downloadMarkdown
} from "../services/downloadService";

function GenerateReport() {

    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [error, setError] = useState("");

    const reportRequest = {

        query,

        name: "Guest",

        age: 20,

        qualification: "B.Tech",

        experience_level: "Intermediate",

        explanation_style: "balanced",

        template: "technical"

    };

    const handleGenerate = async () => {

        if (!query.trim()) {

            setError("Please enter a research topic.");

            return;

        }

        setLoading(true);

        setError("");

        setResult(null);

        try {

            const response = await generateReport(query);

            setResult(response);

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                err.response?.data?.detail ||

                err.message

            );

        }

        setLoading(false);

    };

    const handlePDF = async () => {

        try {

            const blob = await downloadPDF(reportRequest);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "Research_Report.pdf";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

        }

    };

    const handleDOCX = async () => {

        try {

            const blob = await downloadDOCX(reportRequest);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "Research_Report.docx";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

        }

    };

    const handleMarkdown = async () => {

        try {

            const blob = await downloadMarkdown(reportRequest);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "Research_Report.md";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">

                Generate Research Report

            </h1>

            <input

                type="text"

                placeholder="Enter research topic"

                value={query}

                onChange={(e) => setQuery(e.target.value)}

                className="border rounded-lg w-full p-3 mb-4"

            />

            <button

                onClick={handleGenerate}

                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg"

            >

                Generate Report

            </button>

            {loading && (

                <p className="mt-5">

                    Generating Report...

                </p>

            )}

            {error && (

                <p className="mt-5 text-red-500">

                    {error}

                </p>

            )}

            {result && (

                <div className="mt-8">

                    <h2 className="text-xl font-bold mb-4">

                        ✅ Report Generated Successfully

                    </h2>

                    <div className="flex gap-4 mb-6">

                        <button

                            onClick={handlePDF}

                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"

                        >

                            Download PDF

                        </button>

                        <button

                            onClick={handleDOCX}

                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                        >

                            Download DOCX

                        </button>

                        <button

                            onClick={handleMarkdown}

                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"

                        >

                            Download Markdown

                        </button>

                    </div>

                    <pre className="bg-gray-100 p-4 rounded overflow-auto">

                        {JSON.stringify(result, null, 2)}

                    </pre>

                </div>

            )}

        </div>

    );

}

export default GenerateReport;