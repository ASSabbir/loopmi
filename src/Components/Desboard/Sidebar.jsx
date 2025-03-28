import  { useState } from 'react';

import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [flag,setFalg]=useState(1)
    return (
        <div role="tablist" className="tabs border-t-2 border-zinc-300 tabs-bordered  max-w-screen-2xl mx-auto ">
            <Link to={'add_item'} role="tab" onClick={()=>setFalg(1)} className={`tab ${flag == 1 && 'bg-gray-300' }`}>Add Item</Link>
            <Link to={'view_all_items'} role="tab" onClick={()=>setFalg(2)} className={`tab ${flag == 2 && 'bg-gray-300' }`}>Manage Your Products</Link>
            <Link to={'orders'} role="tab" onClick={()=>setFalg(3)} className={`tab ${flag == 3 && 'bg-gray-300' }`}>View All Orders</Link>
            <Link to={'confirm_order'} role="tab" onClick={()=>setFalg(4)} className={`tab ${flag == 4 && 'bg-gray-300' }`}>Confirmed Orders</Link> 
        </div>
    );
};

export default Sidebar;