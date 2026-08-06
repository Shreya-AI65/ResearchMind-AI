import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import GenerateReport from "./pages/GenerateReport";
import ReportHistory from "./pages/ReportHistory";
import SearchReports from "./pages/SearchReports";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

function App() {

    return (

        <BrowserRouter>

            <Layout>

                <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route
                        path="/generate"
                        element={<GenerateReport />}
                    />

                    <Route
                        path="/history"
                        element={<ReportHistory />}
                    />

                    <Route
                        path="/search"
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

                </Routes>

            </Layout>

        </BrowserRouter>

    );

}

export default App;