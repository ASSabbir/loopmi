
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

const Root = () => {
    return (
        <div className='font-Poppins'>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;