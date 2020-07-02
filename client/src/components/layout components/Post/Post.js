import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../../actions/getPostAction';
import { showNav } from '../../../actions/navAction';

// Parse HTML string to HTML
import HTMLReactParser from 'html-react-parser';
import PostHolder from './Post-Placeholder/PostHolder';

const Post = ({ post: { currentPost, openedPost, loadingPost }, getPost }) => {
    const [post, setPost] = useState({});
    useEffect(() => {
        if (isEmpty(openedPost)) {
            if (currentPost === null) {
                getPost(sessionStorage.getItem('postID'));
            } else {
                getPost(currentPost);
            }
        }
        if (isEmpty(post)) {
            setPost(openedPost);
        }
        showNav();
        // eslint-disable-next-line
    }, [currentPost, openedPost]);

    const isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    };

    const loadingStyles = loadingPost ? { display: 'none' } : {};

    return (
        <React.Fragment>
            {loadingPost && <PostHolder />}
            <div className='post-container-one' style={loadingStyles}>
                <h1 className='post-heading'>{post.heading}</h1>
                <div className='user-p d-flex align-items-center'>
                    <span>{post.name}</span>
                    <div className='dot-i'></div>
                    <span>null time</span>
                </div>
                <div className='img-post-container'></div>
                <p className='nn-new'>
                    {post.content !== undefined &&
                        HTMLReactParser(post.content)}
                </p>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        post: state.post,
    };
};

export default connect(mapStateToProps, { getPost, showNav })(Post);
