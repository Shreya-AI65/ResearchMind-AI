import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import GenerateReport from "./pages/GenerateReport";
import ReportHistory from "./pages/ReportHistory";
import SearchReports from "./pages/SearchReports";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import ReportViewer from "./pages/ReportViewer";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route element={<Layout />}>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/generate-report"
                        element={<GenerateReport />}
                    />

                    <Route
                        path="/report-history"
                        element={<ReportHistory />}
                    />

                    <Route
                        path="/search-reports"
                        element={<SearchReports />}
                    />

                    <Route
                        path="/statistics"
                        element={<Statistics />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                    <Route
                        path="/report-viewer"
                        element={<ReportViewer />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;