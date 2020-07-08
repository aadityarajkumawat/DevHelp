import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { connect } from 'react-redux';
import Logo from '../../assets/favicon.svg';
import { toggleSlideMenu } from '../../actions/slideMenu';

const DashboardSideBar = ({ logout, slideMenu, toggleSlideMenu }) => {
    const logoutUser = () => {
        logout();
    };

    const toggleMenu = React.useRef(null);
    const backdrop = React.useRef(null);

    React.useEffect(() => {
        toggleMenu.current.classList.toggle('open-slide-bar');
        backdrop.current.classList.toggle('remove-backdrop');
    }, [slideMenu]);

    const removeMenu = () => {
        toggleSlideMenu(false);
        backdrop.current.classList.remove('remove-backdrop');
    };

    return (
        <Fragment>
            <div
                ref={toggleMenu}
                className='options-bar flex-column align-items-center open-slide-bar'>
                <Link to='/' onClick={removeMenu}>
                    <div className='div-icon'>
                        <img src={Logo} alt='' />
                    </div>
                </Link>
                <Link to='/dashboard/home' onClick={removeMenu}>
                    Home
                </Link>
                <Link to='/dashboard/saved' onClick={removeMenu}>
                    Saved Posts
                </Link>
                <a href='!#' onClick={removeMenu}>
                    Posts
                </a>
                <a href='!#' onClick={removeMenu}>
                    Stats
                </a>
                <a href='!#' onClick={removeMenu}>
                    Plans
                </a>
                <a href='!#' onClick={removeMenu}>
                    Help
                </a>
                <Link to='/' onClick={logoutUser}>
                    Logout
                </Link>
            </div>
            <div ref={backdrop} className='backdrop' onClick={removeMenu}></div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        slideMenu: state.slideMenu,
    };
};

export default connect(mapStateToProps, { logout, toggleSlideMenu })(
    DashboardSideBar
);
