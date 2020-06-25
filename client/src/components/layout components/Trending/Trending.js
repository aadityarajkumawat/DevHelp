import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTrendingPosts } from '../../../actions/trendingAction';
import TrendingItem from './TrendingItem/TrendingItem';

const Trending = ({
    getTrendingPosts,
    trending: { loading, trendingPosts },
    routing,
}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (trendingPosts.length === 0) {
            getTrendingPosts();
        }
        if (posts.length === 0) {
            setPosts(trendingPosts);
        }
        console.log('The Effect ran');
        // eslint-disable-next-line
    }, [trendingPosts]);

    return (
        <div className='container trending d-flex justify-content-around'>
            {posts.map((post) => (
                <TrendingItem post={post} routing={routing} />
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        trending: state.trending,
    };
};

export default connect(mapStateToProps, { getTrendingPosts })(Trending);
