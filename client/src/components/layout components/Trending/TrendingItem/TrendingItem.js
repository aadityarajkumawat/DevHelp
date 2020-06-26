import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { setCurrentPost } from '../../../../actions/getPostAction';
import PostPlaceHolder from '../../PostPlaceHolder';

import HTMLReactParser from 'html-react-parser';

const TrendingItem = ({
    post,
    setCurrentPost,
    trending: { loading },
    routing,
}) => {
    
    // const [saved, setSaved] = useState()

    const openPost = () => {
        setCurrentPost(post._id.toString());
        console.log('I set Current');
        sessionStorage.setItem('postID', post._id.toString());
        routing.push('/post');
    };

    const savePost = () => {

    }

    const styleForHeading = loading ? { display: 'none' } : {};
    return (
        <div className='trending-item'>
            <div className='img-container' onClick={openPost}></div>
            {loading && <PostPlaceHolder />}
            {post !== undefined && (
                <div className='bottom-section' style={styleForHeading}>
                    <h3 onClick={openPost}>
                        {post.heading.length > 47
                            ? post.heading.substr(0, 47) + '...'
                            : post.heading}
                    </h3>
                    <Fragment>
                        {/* {post.desc !== undefined && HTMLReactParser(post.desc)} */}
                    </Fragment>
                    <div className='user d-flex align-items-center justify-content-start'>
                        <p>{post.name}</p>
                        <span className='dot'></span>
                        <p>null min</p>
                        <i
                            onClick={savePost}
                            className={`fa${'r'} fa-bookmark`}></i>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        trending: state.trending,
    };
};

export default connect(mapStateToProps, { setCurrentPost })(TrendingItem);
