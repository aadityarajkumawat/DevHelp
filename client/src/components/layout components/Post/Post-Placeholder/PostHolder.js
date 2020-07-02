import React from 'react';
import styled, { keyframes } from 'styled-components';

const PostHolder = () => {
    return (
        <HolderWrapper>
            <HeadingHolder>
                <HeadingLoader></HeadingLoader>
            </HeadingHolder>
            <ImageLoading>
                <ImageLoader></ImageLoader>
            </ImageLoading>
        </HolderWrapper>
    );
};

const HolderWrapper = styled.div`
    width: 100%;
    padding: 60px 130px 0 130px;
`;

const HeadingHolder = styled.div`
    width: 100%;
    height: 60px;
    background: #e9e9e9;
    overflow: hidden;
    margin-bottom: 20px;
`;

const move = keyframes`
    from {
        transform: translateX(0px);
    }
    to {
        transform: translateX(1400px);
    }
`;

const HeadingLoader = styled.div`
    width: 100px;
    height: 60px;
    background: linear-gradient(to right, #e9e9e9, #fff, #e9e9e9);
    transform: translate(-100px);
    animation: ${move} 0.6s infinite ease-in-out;
`;

const ImageLoading = styled.div`
    width: 100%;
    height: 300px;
    background: #e9e9e9;
    margin-bottom: 20px;
`;

const ImageLoader = styled.div`
    width: 100px;
    height: 100%;
    background: linear-gradient(to right, #e9e9e9, #fff, #e9e9e9);
    transform: translate(-100px);
    animation: ${move} 0.6s infinite ease-in-out;
`;

export default PostHolder;
