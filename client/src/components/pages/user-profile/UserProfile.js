import * as S from "@chakra-ui/react";
import React from "react";
import { connect } from "react-redux";

const UserProfile = ({ profile, post }) => {
  return (
    <S.Flex>
      <S.Flex flexDir="column" alignItems="center">
        <S.Flex flexDir="column" alignItems="center">
          <S.Image
            src={profile.thatProfile ? profile.thatProfile.image : "#"}
            alt="user"
            w="200px"
            h="200px"
            borderRadius="100%"
          />
          <S.Flex flexDirection="column" alignItems="center">
            <div className="that-user-name">
              <strong>{post.openedPost.name}</strong>
            </div>
            <div>{profile.thatProfile ? profile.thatProfile.bio : ""}</div>
            <div>{profile.thatProfile ? profile.thatProfile.country : ""}</div>
          </S.Flex>
        </S.Flex>
        <div className="user-posts-hh">User Posts</div>
        {post.reallyAllPosts && (
          <div className="posts-ii-list">
            {post.reallyAllPosts.map((post) => (
              <div className="post-ii">
                <div className="post-ii-img">
                  <img src={post.image} alt="user" />
                </div>
                <div className="post-ii-heading">{post.heading}</div>
                <div className="post-ii-info">
                  <div>likes: {post.likes && post.likes.length}</div>
                  <div>comment: 2</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </S.Flex>
    </S.Flex>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {})(UserProfile);
