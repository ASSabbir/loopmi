import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Root from "./Root";
import Home from "../Home/Home";
import Login from "../Log/Login";
import Register from "../Log/Register";
import Desboard from "../Desboard/Desboard";
import Add_items from "../Desboard/Add_items";
import ComingSoon from "../Desboard/ComingSoon";

const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/dashboard',
            element:<Desboard></Desboard>,
            children:[
              {
                path:'add_item',
                element:<Add_items></Add_items>
              },{
                path:'coming_soon',
                element:<ComingSoon></ComingSoon>
              }
            ]
        }
      ]
    },
  ]);

export default Routes;