import React from 'react';
import styled from 'styled-components';
import ActivityList from './ActivityList';

const DashboardSaved = () => {
    return (
        <div className='d-flex flex-column user-data-dash saved-data'>
            <div className='dashboard-heading'>
                <h2>Saved Posts</h2>
            </div>
            <ActivityList />
        </div>
    );
};

export default DashboardSaved;
