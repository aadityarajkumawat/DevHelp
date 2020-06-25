import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { showNav } from '../../actions/navAction';
import { clearPost } from '../../actions/getPostAction';
import Trending from '../layout components/Trending/Trending';

const Home = ({ showNav, clearPost, history }) => {
    useEffect(() => {
        showNav();
        clearPost();
    }, []);
    return <Trending routing={history} />;
};

export default connect(null, { showNav, clearPost })(Home);
