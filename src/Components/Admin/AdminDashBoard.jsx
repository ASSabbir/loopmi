import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";


const AdminDashBoard = () => {
    return (
        <div className='mt-24 '>
            <AdminSidebar></AdminSidebar>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminDashBoard;