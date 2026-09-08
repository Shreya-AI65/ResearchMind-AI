import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
    return (
        <div className="
            min-h-screen
            bg-gray-100
            dark:bg-slate-950
            transition-colors
            duration-300
        ">

            <Sidebar />

            <div className="ml-[270px] min-h-screen">

                <Navbar />

                <main className="
                    min-h-[calc(100vh-76px)]
                    bg-gray-100
                    dark:bg-slate-950
                    transition-colors
                    duration-300
                ">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default MainLayout;