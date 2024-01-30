import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Banner from './Banner';

const Layout = () => {
    const location = useLocation();
    const showBanner = location.pathname !== '/' && location.pathname !== '/register';

    return(
        <div>
            {showBanner && <Banner />}
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;