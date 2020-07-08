import React from 'react';
import { connect } from 'react-redux';
import { toggleSlideMenu } from '../../actions/slideMenu';

const HamMenu = ({ toggleSlideMenu, slideMenu }) => {
    const toggleSlideMenuN = () => {
        if (slideMenu) {
            toggleSlideMenu(false);
        } else {
            toggleSlideMenu(true);
        }
    };
    return (
        <div className='wrapper' onClick={toggleSlideMenuN}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        slideMenu: state.slideMenu,
    };
};

export default connect(mapStateToProps, { toggleSlideMenu })(HamMenu);
