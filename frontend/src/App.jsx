import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import GenerateReport from "./pages/GenerateReport";
import ReportHistory from "./pages/ReportHistory";
import ReportViewer from "./pages/ReportViewer";
import Statistics from "./pages/Statistics";
import Search from "./pages/Search";
import Settings from "./pages/Settings";

function App() {

    return (

        <BrowserRouter>

            <MainLayout>

                <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/generate" element={<GenerateReport />} />

                    <Route path="/history" element={<ReportHistory />} />

                    <Route path="/viewer" element={<ReportViewer />} />

                    <Route path="/statistics" element={<Statistics />} />

                    <Route path="/search" element={<Search />} />

                    <Route path="/settings" element={<Settings />} />

                </Routes>

            </MainLayout>

        </BrowserRouter>

    );

}

export default App;