import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
    const [uploaded, setUploaded] = useState('');

    useEffect(() => {
        loadProfile();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (profile.recievedProfile) {
            setUploaded('Uploaded!');
            setTimeout(() => {
                setUploaded('');
            }, 2000);
        }
        // eslint-disable-next-line
    }, [profile.recievedProfile]);

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

    const uploadStyles = uploaded === 'Uploading...' ? 'orange' : 'green';

    return (
        <React.Fragment>
            <EditProfile sta={profile.backdrop} />
            <div className='profile d-flex justify-content-center flex-column'>
                <div className='img-container'>
                    <img
                        src={
                            profile.profile.image !== undefined
                                ? `${profile.profile.image}`
                                : ''
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
                <span style={{ color: uploadStyles }}>{uploaded}</span>
                <div className='info'>
                    <div className='in-same-line d-flex'>
                        <p className='name'>
                            <strong>
                                {profile.profile.user !== undefined
                                    ? profile.profile.user.name
                                    : ''}
                            </strong>
                        </p>
                        <span className='' onClick={editMyProfile}>
                            <i className='fas fa-pen'></i>
                        </span>
                    </div>
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
