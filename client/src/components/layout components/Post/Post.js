import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../../actions/getPostAction';

// Parse HTML string to HTML
import HTMLReactParser from 'html-react-parser';

const Post = ({ post: { currentPost, openedPost }, getPost }) => {
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
        // eslint-disable-next-line
    }, [currentPost, openedPost]);

    const isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    };

    return (
        <div className='post-container-one'>
            <h1 className='post-heading'>{post.heading}</h1>
            <div className='user-p d-flex align-items-center'>
                <span>{post.name}</span>
                <div className='dot-i'></div>
                <span>null time</span>
            </div>
            <div className='img-post-container'></div>
            <p className='nn-new'>
                {post.content !== undefined && HTMLReactParser(post.content)}
            </p>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        post: state.post,
    };
};

export default connect(mapStateToProps, { getPost })(Post);
