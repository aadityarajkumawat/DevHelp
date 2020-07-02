import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { connect } from 'react-redux';
const DashboardSideBar = ({ logout }) => {
    const logoutUser = () => {
        logout();
    };
    return (
        <div className='d-flex flex-column align-items-center options-bar'>
            <Link to='/'>
                <div className='div-icon'></div>
            </Link>
            <Link to='/dashboard'>Home</Link>
            <Link to='/dashboard/saved'>Saved Posts</Link>
            <a href='/dashboard/home'>Liked Posts</a>
            <a href='/dashboard/home'>Posts</a>
            <a href='/dashboard/home'>Stats</a>
            <a href='/dashboard/home'>Plans</a>
            <a href='/dashboard/home'>Help</a>
            <Link to='/' onClick={logoutUser}>
                Logout
            </Link>
        </div>
    );
};

export default connect(null, { logout })(DashboardSideBar);
