import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeNav } from '../../../actions/navAction';
import DashboardSideBar from '../DashboardSideBar';
import DashboardSaved from '../DashboardSaved';
import { clearPost } from '../../../actions/getPostAction';

const SavedPost = ({ removeNav, history, clearPost }) => {
    useEffect(() => {
        removeNav();
        clearPost();
    }, []);
    return (
        <div className='d-flex dashboard-container'>
            <DashboardSideBar />
            <DashboardSaved routing={history} />
        </div>
    );
};

export default connect(null, { removeNav, clearPost })(SavedPost);
