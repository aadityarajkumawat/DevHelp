import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Profile = ({ auth }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        if (!isEmpty(auth.user)) {
            setUser(auth.user);
        }
    }, [auth.user]);

    const isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    };
    return (
        <div className='profile'>
            <div className='img-container'></div>
            <div className='info'>
                <p className='name'>
                    <strong>{user.name ? user.name : ''}</strong>
                </p>
                <div className='user-data'>
                    <p>{user.bio ? user.bio : ''}</p>
                    <span>{user.country ? user.country : ''}</span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, null)(Profile);
