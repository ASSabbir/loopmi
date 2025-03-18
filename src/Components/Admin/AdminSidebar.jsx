import  { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    const [flag,setFalg]=useState(1)
    return (
        <div role="tablist" className="tabs border-t-2 border-zinc-300 tabs-bordered  max-w-screen-2xl mx-auto ">
            <Link to={'admin_view_users'} role="tab"     onClick={()=>setFalg(1)} className={`tab ${flag == 1 && 'bg-gray-300' }`}>All Users</Link>
            <Link to={'admin_view_items'} role="tab"     onClick={()=>setFalg(2)} className={`tab ${flag == 2 && 'bg-gray-300' }`}>View All Items</Link>
            <Link to={'admin_view_orders'} role="tab"    onClick={()=>setFalg(3)} className={`tab ${flag == 3 && 'bg-gray-300' }`}>View All Orders</Link>
            <Link to={'admin_view_analytics'} role="tab" onClick={()=>setFalg(4)} className={`tab ${flag == 4 && 'bg-gray-300' }`}>Admin Analytics</Link> 
        </div>
    );
};

export default AdminSidebar;