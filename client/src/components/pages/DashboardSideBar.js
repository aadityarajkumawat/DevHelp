import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { connect } from 'react-redux';
import Logo from '../../assets/favicon.svg';
import { toggleSlideMenu } from '../../actions/slideMenu';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const DashboardSideBar = ({ logout, slideMenu, toggleSlideMenu }) => {
    const matches = useMediaQuery('(max-width: 950px)');

    const logoutUser = () => {
        logout();
    };

    const toggleMenu = React.useRef(null);
    const backdrop = React.useRef(null);

    React.useEffect(() => {
        if (matches && slideMenu) {
            toggleMenu.current.classList.add('open-slide-bar');
            backdrop.current.classList.remove('remove-backdrop');
        } else {
            toggleMenu.current.classList.remove('open-slide-bar');
            backdrop.current.classList.add('remove-backdrop');
        }
    }, [slideMenu, matches]);

    const removeMenu = () => {
        if (matches) {
            toggleSlideMenu(false);
            backdrop.current.classList.add('remove-backdrop');
        } else {
            backdrop.current.classList.add('remove-backdrop');
        }
    };

    return (
        <Fragment>
            <div
                ref={toggleMenu}
                className='options-bar flex-column align-items-center'>
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
