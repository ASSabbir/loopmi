import React, { useContext } from 'react';
import { AuthContext } from '../Root/AuthProvider';
import useRole from '../Root/useRole';
import { Navigate } from 'react-router-dom';

const VendorPrivate = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const [users,isLoading]=useRole()
    
    if(loading){
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
        <span className="loading loading-bars loading-lg"></span>
    </div>
    }
    if(isLoading){
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
        <span className="loading loading-bars loading-lg"></span>
    </div>
    }
    
    if(users.role=='Vendor'){
        return children
    }
    else{
        return (
            <Navigate state={location.pathname} to={'/login'}></Navigate>
        )
    }
    
    
};

export default VendorPrivate;