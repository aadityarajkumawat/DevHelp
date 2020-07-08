import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ navbar, auth: { isAuthenticated } }) => {
    const dropDown = useRef(null);
    const dropCloser = useRef(null);

    const openDropDown = () => {
        dropDown.current.classList.toggle('toggle-drop-down');
        dropCloser.current.style.display = 'block';
    };

    const closeDrop = () => {
        dropCloser.current.style.display = 'none';
        dropDown.current.classList.remove('toggle-drop-down');
    };

    return navbar ? (
        <div className='container nav-container'>
            <div
                ref={dropCloser}
                className='drop-closer'
                onClick={closeDrop}></div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light bd-navbar d-flex justify-content-between'>
                <Link className='navbar-brand' to='/'>
                    DevHelp
                </Link>
                <div className='utils d-flex align-items-center'>
                    <div className='icons'>
                        <span>
                            <i className='fas fa-search'></i>
                        </span>
                        <span>
                            <i className='far fa-bookmark'></i>
                        </span>
                    </div>
                    <div className='upgrade'>
                        <button className='btn btn-outline-secondary'>
                            Upgrade
                        </button>
                    </div>
                    <div className='user-icon' onClick={openDropDown}>
                        <div className='img'></div>
                        <ul
                            ref={dropDown}
                            className='drop-down-container flex-column text-center'>
                            <li>
                                {!isAuthenticated && (
                                    <Link to='/login'>Login</Link>
                                )}
                            </li>
                            <li>
                                <Link to='/dashboard/home'>Dashboard</Link>
                            </li>
                            <li>
                                <Link to='/compose-post'>Compose Post</Link>
                            </li>
                            <li>Plans</li>
                            <li>Liked Posts</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    ) : (
        <div></div>
    );
};

const mapStateToProps = (state) => {
    return {
        navbar: state.navbar,
        auth: state.auth,
    };
};

export default connect(mapStateToProps, null)(Navbar);
