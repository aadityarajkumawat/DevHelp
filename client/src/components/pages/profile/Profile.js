import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import isEmpty from '../../../utils/isEmpty';

const Profile = ({ auth }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        if (!isEmpty(auth.user)) {
            setUser(auth.user);
        }
    }, [auth.user]);

    const editMyProfile = () => {};

    return (
        <div className='profile d-flex justify-content-center flex-column'>
            <div className='img-container'>
                {/* <img src={} alt=""/> */}
                <span className='change-profile-photo'></span>
            </div>
            <div className='info'>
                <p className='name'>
                    <strong>{user.name ? user.name : ''}</strong>
                </p>
                <button className='btn btn-primary' onClick={editMyProfile}>
                    Edit Profile
                </button>
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
