import React from 'react';
import ActivityList from './ActivityList';
import HamMenu from './HamMenu';

const DashboardSaved = ({}) => {
    return (
        <div className='d-flex flex-column user-data-dash saved-data'>
            <div className='dashboard-heading'>
                <h2>Saved Posts</h2>
                <HamMenu />
            </div>
            <ActivityList />
        </div>
    );
};

export default DashboardSaved;
