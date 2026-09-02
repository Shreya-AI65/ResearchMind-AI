import { Outlet } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";


function Layout() {

    return (

        <div
            className="
                min-h-screen
                flex

                bg-gray-100
                dark:bg-slate-950

                text-gray-900
                dark:text-slate-100

                transition-colors
                duration-300
            "
        >

            <Sidebar />


            <div className="flex-1 min-w-0">

                <Navbar />


                <main
                    className="
                        min-h-screen

                        bg-gray-100
                        dark:bg-slate-950

                        transition-colors
                        duration-300
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );
}


export default Layout;