import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { connect } from 'react-redux';
import Logo from '../../assets/favicon.svg';
const DashboardSideBar = ({ logout }) => {
    const logoutUser = () => {
        logout();
    };

    return (
        <div className='d-flex flex-column align-items-center options-bar'>
            <Link to='/'>
                <div className='div-icon'>
                    <img src={Logo} alt='' />
                </div>
            </Link>
            <Link to='/dashboard/home'>Home</Link>
            <Link to='/dashboard/saved'>Saved Posts</Link>
            <a href='!#'>Posts</a>
            <a href='!#'>Stats</a>
            <a href='!#'>Plans</a>
            <a href='!#'>Help</a>
            <Link to='/' onClick={logoutUser}>
                Logout
            </Link>
        </div>
    );
};

export default connect(null, { logout })(DashboardSideBar);
