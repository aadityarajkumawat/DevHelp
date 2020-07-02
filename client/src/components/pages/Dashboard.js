import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { removeNav } from '../../actions/navAction';
import { clearPost } from '../../actions/getPostAction';
import DashboardSideBar from './DashboardSideBar';
import DashboardHome from './DashboardHome';

const Dashboard = ({ removeNav, clearPost, history }) => {
    useEffect(() => {
        removeNav();
        clearPost();
    }, []);

    return (
        <div className='d-flex dashboard-container'>
            <DashboardSideBar />
            <DashboardHome />
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
    clearPost,
})(Dashboard);
