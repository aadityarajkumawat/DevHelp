import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeNav } from '../../../actions/navAction';
import DashboardSideBar from '../DashboardSideBar';
import DashboardSaved from '../DashboardSaved';

const SavedPost = ({ removeNav }) => {
    useEffect(() => {
        removeNav();
    }, []);
    return (
        <div className='d-flex dashboard-container'>
            <DashboardSideBar />
            <DashboardSaved />
        </div>
    );
};

export default connect(null, { removeNav })(SavedPost);
