import {
  createBrowserRouter,

} from "react-router-dom";
import Root from "./Root";
import Home from "../Home/Home";
import Login from "../Log/Login";
import Register from "../Log/Register";
import Desboard from "../Desboard/Desboard";
import Add_items from "../Desboard/Add_items";


import Shop from "../Shop/Shop";
import ShopCard from "../Shop/ShopCard";
import Cart from "../Shop/Cart";
import UserPrivate from "./UserPrivate";
import ViewOrderedItems from "../Vendor/ViewOrderedItems";
import ComingSoon from "../Vendor/ComingSoon";
import VendorPrivate from "../Vendor/VendorPrivate";
import AdminDashBoard from "../Admin/AdminDashBoard";
import Admin_users from "../Admin/Admin_users";
import Admin_orders from "../Admin/admin_orders";
import Admin_items from "../Admin/Admin_items";
import Admin_Analytics from "../Admin/Admin_Analytics";
import ViewAllItem from "../Vendor/ViewAllItem";
import ConfirmOrdr from "../Vendor/ConfirmOrdr";
import VendorRegister from "../Log/VendorRegister";
import Profile from "../Log/Profile";
import Become_Vendor from "../Become_Vendor/Become_Vendor";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/cart',
        element: <UserPrivate><Cart></Cart></UserPrivate>
      },
      {
        path: '/item/:id',
        element: <UserPrivate><ShopCard></ShopCard></UserPrivate>
      },
      {
        path: '/shop',
        element: <Shop></Shop>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/profile',
        element: <UserPrivate><Profile></Profile></UserPrivate>
      },
      {
        path: '/vendor_register',
        element: <VendorRegister></VendorRegister>
      },
      {
        path:'/become_vendor',
        element:<Become_Vendor></Become_Vendor>
      },
      {
        path: '/admin_panel',
        element: <AdminDashBoard></AdminDashBoard>,
        children: [
          {
            path: 'admin_view_users',
            element: <Admin_users></Admin_users>,
          },
          {
            path: 'admin_view_orders',
            element: <Admin_orders></Admin_orders>

          }, {
            path: 'admin_view_items',
            element: <Admin_items></Admin_items>
          }, {
            path: 'admin_view_analytics',
            element: <Admin_Analytics></Admin_Analytics>

          },

        ]
      },
      {
        path: '/dashboard',
        element: <VendorPrivate><Desboard></Desboard></VendorPrivate>,
        children: [
          {
            path: 'add_item',
            element: <Add_items></Add_items>
          }, {
            path: 'view_all_items',
            element: <ViewAllItem></ViewAllItem>
          }, {
            path: 'orders',
            element: <ViewOrderedItems></ViewOrderedItems>
          }, {
            path: 'confirm_order',
            element: <ConfirmOrdr></ConfirmOrdr>
          }
        ]
      }
    ]
  },
]);

export default Routes;