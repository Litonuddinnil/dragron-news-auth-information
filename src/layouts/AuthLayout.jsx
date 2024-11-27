import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

 

const AuthLayout = () => {
    return (
        <div className="font-poppins bg-[#F3F3F3] w-full">
             <header className="py-6 mx-auto w-11/12">
             <Navbar></Navbar>
             </header>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;