import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { FaUser } from 'react-icons/fa';

import { IoMdCart } from 'react-icons/io';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';

import useRole from './useRole';
const Nav = () => {
    const { user, logout, cartCount } = useContext(AuthContext)
    const navg=useNavigate()
    const [users] = useRole()
    
    
    console.log(users)
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const navlink = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/shop'}>Shop</Link></li>
        <li><Link to={'/contact_us'}>Contact Us</Link></li>
        {users?.role == 'Vendor' &&
           <li> <Link to={'/dashboard/add_item'}  >Vendor Dashboard</Link></li>
        }
        {users?.role == 'Admin' &&
            <li><Link to={'/admin_panel/admin_view_users'} >Admin Panel</Link></li>
        }
    </>

    const handelLogout = () => {
        logout()
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: `LogOut success`,
                });
                localStorage.removeItem('user')
                navg('/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (

        <div className='fixed w-full bg-white z-50 top-0'>
            <div className="max-w-screen-2xl py-5 mx-auto navbar ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navlink}
                        </ul>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src={logo} alt="" className='w-14' />
                        <h1 className='text-2xl font-bold '>loopmi</h1>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlink}
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                    <Link to={'/cart'} id='button' className='p-2 relative  n rounded-full text-white text-xl'><IoMdCart />

                        {
                            cartCount > 0 &&
                            <span className="absolute -top-3 rounded-3xl w-5 h-5 flex justify-center items-center text-sm -right-2  bg-red-400 ">{cartCount}
                            </span>
                        }
                    </Link>


                    {/* {users.role == 'Vendor' &&
                        <Link to={'/dashboard/add_item'} id='button' className='p-2 rounded-full text-white text-xl'><MdDashboard /></Link>

                    }
                    {users.role == 'Admin' &&
                        <Link to={'/admin_panel/admin_view_users'} id='button' className='px-2 p-1 text-sm rounded-full text-white bg-color4'>Admin Panel</Link>
                    } */}
                    {
                        user ?
                            <div className="dropdown dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className=" m-1"><img alt="" className="w-10 h-10 object-cover rounded-full ring-2 ring-offset-4 bg-gray-500 ring-color5 ring-offset-gray-100" src={user.photoURL} /></div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><Link to={'/profile'}>Profile</Link></li>
                                    <li><button onClick={handelLogout}>Log Out</button></li>
                                </ul>
                            </div>

                            :
                            <Link to={'/login'} id='button' className='p-2 rounded-full text-white text-xl'><FaUser /></Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Nav;