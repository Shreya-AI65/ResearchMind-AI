import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {

    return (
        <div className="min-h-screen bg-sky-50 flex">

            <Sidebar />

            <div className="flex-1 min-w-0">

                <Navbar />

                <main>
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default Layout;