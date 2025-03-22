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
    const navg = useNavigate()
    const [users, isLoading] = useRole()

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

    // Category definitions with subcategories
    const categories = [
        {
            name: "Electronics",
            path: "/categories/electronics",
            subcategories: [
                { name: "Smartphones", path: "/categories/electronics/smartphones" },
                { name: "Laptops", path: "/categories/electronics/laptops" },
                { name: "Audio", path: "/categories/electronics/audio" },
                { name: "Home Appliances", path: "/categories/electronics/home-appliances" }
            ]
        },
        {
            name: "Fashion",
            path: "/categories/fashion",
            subcategories: [
                { name: "Men's Clothing", path: "/categories/fashion/mens-clothing" },
                { name: "Women's Clothing", path: "/categories/fashion/womens-clothing" },
                { name: "Accessories", path: "/categories/fashion/accessories" },
                { name: "Footwear", path: "/categories/fashion/footwear" }
            ]
        },
        {
            name: "Home & Garden",
            path: "/categories/home-garden",
            subcategories: [
                { name: "Furniture", path: "/categories/home-garden/furniture" },
                { name: "Kitchen", path: "/categories/home-garden/kitchen" },
                { name: "Gardening", path: "/categories/home-garden/gardening" },
                { name: "Decor", path: "/categories/home-garden/decor" }
            ]
        },
        {
            name: "Sports & Outdoors",
            path: "/categories/sports-outdoors",
            subcategories: [
                { name: "Exercise Equipment", path: "/categories/sports-outdoors/exercise" },
                { name: "Outdoor Gear", path: "/categories/sports-outdoors/outdoor-gear" },
                { name: "Sporting Goods", path: "/categories/sports-outdoors/sporting-goods" }
            ]
        },
        {
            name: "Books & Media",
            path: "/categories/books-media",
            subcategories: [
                { name: "Books", path: "/categories/books-media/books" },
                { name: "Movies", path: "/categories/books-media/movies" },
                { name: "Music", path: "/categories/books-media/music" }
            ]
        }
    ];

    // Updated navigation links as requested
    const navlink = <>
        <li><Link to={'/'}>Home</Link></li>

        {/* Simple Categories link for mobile */}
        <li className="lg:hidden"><Link to={'/'}>Categories</Link></li>

        {/* Desktop Categories with megamenu - only visible on larger screens */}
        <li className="dropdown dropdown-hover hidden lg:block">
            <Link to={'/'} tabIndex={0} className="">Categories</Link>
            <div tabIndex={0} className="dropdown-content z-[100] bg-base-100 shadow-xl rounded-box absolute mt-2 " style={{ width: '1000px', left: '-400px' }}>
                <div className="bg-base-100 p-4 ">

                    <div className="grid grid-cols-5 gap-4 ">
                        {categories.map((category, index) => (
                            <div key={index} className="flex flex-col">
                                <Link to={category.path} className="font-bold text-color5 mb-2 hover:underline">
                                    {category.name}
                                </Link>
                                <ul className="space-y-1">
                                    {category.subcategories.map((subcat, idx) => (
                                        <li key={idx}>
                                            <Link to={subcat.path} className="text-sm hover:text-color5 transition-colors">
                                                {subcat.name}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link to={category.path} className="text-sm text-color5 hover:underline">
                                            View All →
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                        <Link to="/categories" className="font-semibold text-color5 hover:underline">
                            Browse All Categories
                        </Link>
                    </div>
                </div>
            </div>
        </li>
        <li><Link to={'/shop'}>Shop</Link></li>



        {/* Keep existing role-specific navigation */}
        {users?.role === 'Vendor' &&
            <li><Link to={'/dashboard/add_item'}>Vendor Dashboard</Link></li>
        }
        {users?.role === 'Admin' &&
            <li><Link to={'/admin_panel/admin_view_users'}>Admin Panel</Link></li>
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
                    <div className='flex justify-center items-center cursor-pointer' onClick={() => navg('/')}>
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
                    <Link to={'/cart'} id='button' className='p-2 relative n rounded-full text-white text-xl'><IoMdCart />
                        {cartCount > 0 &&
                            <span className="absolute -top-3 rounded-3xl w-5 h-5 flex justify-center items-center text-sm -right-2 bg-red-400">{cartCount}
                            </span>
                        }
                    </Link>

                    {user ?
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className="m-1"><img alt="" className="w-10 h-10 object-cover rounded-full ring-2 ring-offset-4 bg-gray-500 ring-color5 ring-offset-gray-100" src={user.photoURL} /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><Link to={'/profile'}>Profile</Link></li>
                                <li><Link to={'/become_vendor'}>Sell Your Product</Link></li>
                                {user && <li><Link to={'/my-orders'}>My Orders</Link></li>}
                                <li><Link to={'/support'}>Support</Link></li>
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