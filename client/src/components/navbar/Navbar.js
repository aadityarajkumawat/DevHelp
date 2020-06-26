import React, { useRef } from 'react';
import { connect } from 'react-redux';

const Navbar = ({ navbar }) => {
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
                <a className='navbar-brand' href='/'>
                    DevHelp
                </a>
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
                                <a href='/login'>Login</a>
                            </li>
                            <li>Dashboard</li>
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
    };
};

export default connect(mapStateToProps, null)(Navbar);
