import React, { useState, useEffect, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import {
    setCurrentPost,
    savePost,
    getSavedPosts,
} from '../../../../actions/getPostAction';
import PostPlaceHolder from '../../PostPlaceHolder';
import { getAdminPrivilages } from '../../../../actions/adminPrivilagesAction';
import OptionsMenu from '../../OptionsMenu';

const TrendingItem = ({
    post,
    setCurrentPost,
    trending: { loading },
    routing,
    by,
    postRedu: { loadingUserPosts, savedPosts, status },
    getAdminPrivilages,
    adminPrivilages,
    savePost,
    auth,
    getSavedPosts,
}) => {
    const [loadingUNI, setLoadingUNI] = useState(true);
    const [openOptions, setOpenOptions] = useState(false);

    const checkSavedStatus = () => {
        return (
            savedPosts
                .map((savedPostData) => savedPostData.savedID)
                .filter((oneID) => oneID === post._id.toString()).length > 0
        );
    };

    const exitOptionsRef = useRef(null);

    const openPost = () => {
        if (post !== undefined) {
            setCurrentPost(post._id.toString());
            console.log('I set Current');
            sessionStorage.setItem('postID', post._id.toString());
            routing.push('/post');
        }
    };

    const saveThisPost = () => {
        if (auth.isAuthenticated) {
            savePost(post._id.toString());
        }
    };
    let styleForHeading = {};

    useEffect(() => {
        getSavedPosts();
    }, [status]);

    useEffect(() => {
        getSavedPosts();
        if (by === 'home') {
            getAdminPrivilages(false);
        } else {
            // routing.push('/login');
        }
        console.log('savedPosts changed');
    }, []);

    useEffect(() => {
        if (by === 'home') {
            styleForHeading = loading ? { display: 'none' } : {};
            setLoadingUNI(loading);
        } else if (by === 'dashboard') {
            styleForHeading = loadingUserPosts ? { display: 'none' } : {};
            setLoadingUNI(loadingUserPosts);
        } else {
            styleForHeading = {};
        }
    }, [loadingUNI, loadingUserPosts, loading]);

    const openOptionsMenu = () => {
        setOpenOptions((prev) => !prev);
    };

    const _exitOptionMode_ = () => {
        setOpenOptions((prev) => !prev);
    };

    return (
        <div className='trending-item'>
            <div
                className='img-container'
                onClick={post !== undefined ? openPost : null}></div>
            {loadingUNI && <PostPlaceHolder />}
            {post !== undefined && (
                <div className='d-flex bottom-section' style={styleForHeading}>
                    <div className='post-info--ss'>
                        <h3 onClick={openPost}>
                            {post.heading.length > 47
                                ? post.heading.substr(0, 47) + '...'
                                : post.heading}
                        </h3>
                        <div className='user d-flex align-items-center justify-content-start'>
                            <p>{post.name}</p>
                            <span className='dot'></span>
                            <p>null min</p>
                        </div>
                    </div>
                    <div className='d-flex flex-column-reverse justify-content-between post-options--s'>
                        <i
                            onClick={saveThisPost}
                            className={`fa${
                                checkSavedStatus() ? 's' : 'r'
                            } fa-bookmark save--post`}></i>
                        {adminPrivilages.postAccessibility && (
                            <Fragment>
                                <div
                                    className='admin-options'
                                    onClick={openOptionsMenu}
                                    style={{ position: 'relative' }}>
                                    <i
                                        className={`fas fa-ellipsis-v options--post`}></i>
                                    <OptionsMenu
                                        displayStatus={openOptions}
                                        postID={post._id}
                                        userID={post.user}
                                    />
                                </div>
                                <div
                                    ref={exitOptionsRef}
                                    className='exit-option-mode'
                                    onClick={_exitOptionMode_}
                                    style={{
                                        display: openOptions ? 'block' : 'none',
                                    }}></div>
                            </Fragment>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        trending: state.trending,
        postRedu: state.post,
        adminPrivilages: state.adminPrivilages,
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {
    setCurrentPost,
    getAdminPrivilages,
    savePost,
    getSavedPosts,
})(TrendingItem);
