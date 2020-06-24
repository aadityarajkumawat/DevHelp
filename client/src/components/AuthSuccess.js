import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authAction';

const AuthSuccess = ({ auth: { isAuthenticated }, logout, history }) => {
    const logoutUser = () => {
        logout();
        history.push('/login');
    };

    return (
        <div className='center-heading-below'>
            <h1 className='user-authenticated' style={{ fontSize: '40px' }}>
                Conragulations you are Authenticated!!
            </h1>
            <input
                type='button'
                value='Logout'
                className='button is-primary'
                onClick={logoutUser}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { logout })(AuthSuccess);
