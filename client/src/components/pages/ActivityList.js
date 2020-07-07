import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getSavedPosts, savePost } from '../../actions/getPostAction';

const ActivityList = ({ post, getSavedPosts, savePost }) => {
    const [postsSaved, setPostsSaved] = useState([]);
    useEffect(() => {
        if (post.savedPosts.length === 0) {
            getSavedPosts();
            // console.log(1);
        }
        if (postsSaved.length === 0) {
            setPostsSaved(post.savedPosts);
            // console.log(2);
        }
        // console.log(3);
    }, [post.savedPosts.length]);

    const removeThisSavedPost = (id) => {
        savePost(id);
        // this actually runs the save btn once again (:)
    };
    return (
        <div className='activity-list'>
            <ul className='list-ul'>
                {postsSaved.map((post) => (
                    <li key={post._id}>
                        <div className='list-item-div d-flex justify-content-between align-items-center'>
                            <div className='right'>
                                <div className='post-img'></div>
                                <h3>{post.heading}</h3>
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

export default connect(mapStateToProps, { getSavedPosts, savePost })(
    ActivityList
);
