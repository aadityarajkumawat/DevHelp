import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPost } from '../../../../actions/getPostAction';

const TrendingItem = ({ post, setCurrentPost, routing }) => {
    const openPost = () => {
        setCurrentPost(post._id.toString());
        console.log('I set Current');
        sessionStorage.setItem('postID', post._id.toString());
        routing.push('/post');
    };
    return (
        <div className='trending-item'>
            <div className='img-container' onClick={openPost}></div>
            <div className='bottom-section'>
                <h3 onClick={openPost}>
                    {post.heading.length > 47
                        ? post.heading.substr(0, 47) + '...'
                        : post.heading}
                </h3>
                <p>{post.content.substr(0, 70) + '...'}</p>
                <div className='user d-flex align-items-center justify-content-start'>
                    <p>{post.name}</p>
                    <span className='dot'></span>
                    <p>6 min</p>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { setCurrentPost })(TrendingItem);
