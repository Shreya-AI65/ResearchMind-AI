import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout({ children }) {

    return (

        <div className="flex bg-gray-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default MainLayout;