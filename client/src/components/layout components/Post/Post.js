import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../../actions/getPostAction';

const Post = ({ post: { currentPost, openedPost }, getPost }) => {
    const [post, setPost] = useState({});
    useEffect(() => {
        if (isEmpty(openedPost)) {
            if (currentPost === null) {
                getPost(sessionStorage.getItem('postID'));
            } else {
                getPost(currentPost);
            }
            console.log(1);
        }
        if (isEmpty(post)) {
            console.log(2);
            setPost(openedPost);
        }
        console.log(3);
        console.log(currentPost);
        // eslint-disable-next-line
    }, [currentPost]);

    const isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    };
    return (
        <div>
            <h1>{openedPost.heading}</h1>
            <p>{openedPost.content}</p>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        post: state.post,
    };
};

export default connect(mapStateToProps, { getPost })(Post);
