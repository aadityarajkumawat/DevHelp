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

    @media screen and (max-width: 950px) {
        padding: 30px 30px 0 30px;
    }
`;

const HeadingHolder = styled.div`
    width: 100%;
    height: 66px;
    background: #e9e9e9;
    overflow: hidden;
    margin-bottom: 20px;
`;

const move = keyframes`
    from {
        transform: translateX(-1089px);
    }
    to {
        transform: translateX(1089px);
    }
`;

const HeadingLoader = styled.div`
    width: 100%;
    height: 66px;
    background: linear-gradient(90deg, #e9e9e9 0%, #ffffff 50%, #e9e9e9 100%);
    animation: ${move} 1s infinite ease-in-out;
`;

const ImageLoading = styled.div`
    width: 100%;
    height: 400px;
    background: #e9e9e9;
    margin-bottom: 20px;
    overflow-x: hidden;
`;

const ImageLoader = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        #e9e9e9 0%,
        #ffffff 52.08%,
        #e9e9e9 100%
    );
    animation: ${move} 1s infinite ease-in-out;
`;

export default PostHolder;
