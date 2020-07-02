import React from 'react';
import UserPost from './user-post/UserPost';
import Profile from './profile/Profile';

const DashboardHome = ({ routing }) => {
    return (
        <div className='d-flex flex-column user-data-dash'>
            <div className='dashboard-heading'>
                <h2>Dashboard</h2>
            </div>
            <Profile />
            <UserPost routing={routing} />
        </div>
    );
};

export default DashboardHome;
