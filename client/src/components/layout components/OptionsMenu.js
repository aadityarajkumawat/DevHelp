import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { deletePost, getUserPosts } from '../../actions/getPostAction';

const OptionsMenu = ({
    displayStatus,
    deletePost,
    postID,
    userID,
    getUserPosts,
}) => {
    const [displayFlex, setDisplayFlex] = React.useState(false);
    useEffect(() => {
        setDisplayFlex(displayStatus);
    }, [displayStatus]);

    const deleteThisPost = () => {
        deletePost(postID);
        getUserPosts(userID);
    };

    return (
        <PopupMenu displayN={displayFlex} onClick={deleteThisPost}>
            Delete
        </PopupMenu>
    );
};

const pop = keyframes`
from {
    opacity: 0;
    transform: scale(1.1);
}
to {
    opacity: 1;
    transform: scale(1);
}
`;
const PopupMenu = styled.div`
    position: absolute;
    width: 150px;
    height: 40px;
    background-color: #121212;
    z-index: 4;
    right: 0;
    color: white;
    font-family: 'Helvetica';
    display: ${(props) => (props.displayN ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    animation: ${pop} 0.3s ease;
`;

export default connect(null, { deletePost, getUserPosts })(OptionsMenu);
