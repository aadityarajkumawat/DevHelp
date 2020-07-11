import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import isEmpty from '../../../utils/isEmpty';
import {
    uploadProfilePhoto,
    loadProfile,
    toggleBackdrop,
} from '../../../actions/profileAction';
import EditProfile from './EditProfile';

const Profile = ({
    auth,
    profile,
    uploadProfilePhoto,
    loadProfile,
    toggleBackdrop,
}) => {
    const [user, setUser] = useState({});
    const [uploaded, setUploaded] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        if (profile.recievedProfile) {
            setUploaded('Uploaded!');
        }
    }, [profile.recievedProfile]);

    useEffect(() => {
        if (!isEmpty(auth.user)) {
            setUser(auth.user);
        }
    }, [auth.user]);

    const editMyProfile = () => {
        if (profile.backdrop) {
            toggleBackdrop(false);
        } else {
            toggleBackdrop(true);
        }
    };

    const addProfile = (e) => {
        const fd = new FormData();
        fd.append('profile', e.target.files[0]);
        uploadProfilePhoto(fd);
        setUploaded('Uploading...');
    };

    return (
        <React.Fragment>
            <EditProfile sta={profile.backdrop} />
            <div className='profile d-flex justify-content-center flex-column'>
                <div className='img-container'>
                    <img
                        src={
                            profile.profile.image !== undefined &&
                            `${profile.profile.image}`
                        }
                        className='profile-img'
                        alt=''
                    />
                    <span className='change-profile-photo d-flex justify-content-center align-items-center'>
                        <i className='fas fa-pen'></i>
                        <input
                            type='file'
                            name='profile'
                            id='profile'
                            onChange={addProfile}
                        />
                    </span>
                </div>
                <span>{uploaded}</span>
                <div className='info'>
                    <p className='name'>
                        <strong>
                            {profile.profile.user !== undefined
                                ? profile.profile.user.name
                                : ''}
                        </strong>
                    </p>
                    <button className='btn btn-primary' onClick={editMyProfile}>
                        Edit Profile
                    </button>
                    <div className='user-data'>
                        <p>
                            {profile.profile !== undefined
                                ? profile.profile.bio
                                : ''}
                        </p>
                        <p>
                            {profile.profile !== undefined
                                ? profile.profile.country
                                : ''}
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profile,
    };
};

export default connect(mapStateToProps, {
    uploadProfilePhoto,
    loadProfile,
    toggleBackdrop,
})(Profile);
