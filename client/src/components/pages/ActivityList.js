import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    getSavedPosts,
    savePost,
    setCurrentPost,
} from '../../actions/getPostAction';

const ActivityList = ({
    post,
    getSavedPosts,
    savePost,
    setCurrentPost,
    routing,
}) => {
    const [postsSaved, setPostsSaved] = useState([]);
    useEffect(() => {
        if (post.savedPosts.length === 0) {
            getSavedPosts();
        }
        if (postsSaved.length === 0) {
            setPostsSaved(post.savedPosts);
        }
    }, [post.savedPosts.length]);

    const removeThisSavedPost = (id) => {
        savePost(id);
    };

    const openThisPost = (id) => {
        if (post !== undefined && routing !== undefined) {
            console.log(id);
            setCurrentPost(id.toString());
            sessionStorage.setItem('postID', id.toString());
            routing.push('/post');
        }
    };

    return (
        <div className='activity-list'>
            <ul className='list-ul'>
                {postsSaved.map((post) => (
                    <li key={post._id}>
                        <div className='list-item-div d-flex justify-content-between align-items-center'>
                            <div className='right'>
                                <div className='post-img'>
                                    <img
                                        src={
                                            post !== undefined
                                                ? `${post.image}`
                                                : ''
                                        }
                                        alt=''
                                    />
                                </div>
                                <h3 onClick={() => openThisPost(post.savedID)}>
                                    {post.heading}
                                </h3>
                            </div>
                            <div
                                className='options-manipulate'
                                onClick={() =>
                                    removeThisSavedPost(post.savedID.toString())
                                }>
                                <i className='fas fa-trash-alt'></i>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        post: state.post,
    };
};

export default connect(mapStateToProps, {
    getSavedPosts,
    savePost,
    setCurrentPost,
})(ActivityList);
