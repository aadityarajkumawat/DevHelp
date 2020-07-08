import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TrendingItem from '../../layout components/Trending/TrendingItem/TrendingItem';
import { getUserPosts } from '../../../actions/getPostAction';
import { getAdminPrivilages } from '../../../actions/adminPrivilagesAction';

const UserPost = ({
    post,
    auth,
    getUserPosts,
    routing,
    getAdminPrivilages,
}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (!isEmpty(auth.user)) {
            getUserPosts(auth.user._id);
        }
        if (post.userPosts.length >= 1) {
            setPosts(post.userPosts);
        }
    }, [auth.user, post.userPosts.length, auth.isAuthenticated]);

    useEffect(() => {
        getAdminPrivilages(true);
        // console.log('got privilage');
    }, []);

    const isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    };
    return (
        <div className='d-flex flex-column user-posts'>
            <h2>Your Recent Posts</h2>
            {/* map the posts array over the TrendingItem component */}
            <div className='d-flex postss'>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <TrendingItem
                            key={post._id}
                            post={post}
                            by={'dashboard'}
                            routing={routing}
                            forComp='user-post'
                        />
                    ))
                ) : post.arePosts ? (
                    <Fragment>
                        <TrendingItem />
                        <TrendingItem />
                        <TrendingItem />
                    </Fragment>
                ) : (
                    <div>No Posts</div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        post: state.post,
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { getUserPosts, getAdminPrivilages })(
    UserPost
);
