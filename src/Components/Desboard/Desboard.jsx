import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Desboard = () => {
    return (
        <div className='mt-24 '>
            <Sidebar></Sidebar>
            <Outlet></Outlet>
        </div>
    );
};

export default Desboard;