import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { removeNav } from '../../actions/navAction';
import { logout } from '../../actions/authAction';

import UserPost from './user-post/UserPost';
import Profile from './profile/Profile';

const Dashboard = ({ logout, removeNav, history }) => {
    useEffect(() => {
        removeNav();
    }, []);

    const logoutUser = () => {
        logout();
    };

    return (
        <div className='d-flex dashboard-container'>
            <div className='d-flex flex-column align-items-center options-bar'>
                <a href='/'>
                    <div className='div-icon'></div>
                </a>

                <a href='/dashboard/home'>Home</a>
                <a href='/dashboard/home'>Saved Posts</a>
                <a href='/dashboard/home'>Liked Posts</a>
                <a href='/dashboard/home'>Posts</a>
                <a href='/dashboard/home'>Stats</a>
                <a href='/dashboard/home'>Plans</a>
                <a href='/dashboard/home'>Help</a>
                <a href='/' onClick={logoutUser}>
                    Logout
                </a>
            </div>
            <div className='d-flex flex-column user-data-dash'>
                <div className='dashboard-heading'>
                    <h2>Dashboard</h2>
                </div>
                <Profile />
                <UserPost routing={history} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        post: state.post,
    };
};

export default connect(mapStateToProps, {
    removeNav,
    logout,
})(Dashboard);
