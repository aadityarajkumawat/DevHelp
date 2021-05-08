import * as S from "@chakra-ui/react";
import { convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  clearPostID,
  uploadImage,
  uploadPost,
} from "../../../actions/getPostAction";
import { dispatchPopup } from "../../../actions/popupAction";

const PostEditor = ({
  uploadPost,
  auth: { isAuthenticated },
  post,
  history,
  uploadImage,
  clearPostID,
  dispatchPopup,
}) => {
  const [heading, setHeading] = useState("");
  const [upload, setUpload] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    setUpload("");
    if (post.imageUploaded) {
      setUpload("Uploaded!");
    }
  }, [post.imageUploaded]);

  useEffect(() => {
    if (upload === "Uploaded!") {
      dispatchPopup("Post Image", "Post image has been uploaded successfully!");
    }
  }, [upload]);

  const handleSave = async () => {
    if (isAuthenticated) {
      const postRawContent = convertToRaw(editorState.getCurrentContent())
        .blocks;
      if (heading !== "" && post.postID !== undefined) {
        uploadPost(
          {
            heading: heading,
            content: JSON.stringify(postRawContent),
          },
          post.postID
        );
      }
      clearPostID();
      history.push("/");
    }
  };

  const handleHeadingChange = (e) => {
    const value = e.target.value;
    setHeading(value);
  };

  const addFile = async (e) => {
    const fd = new FormData();
    fd.append("file", e.target.files[0]);
    uploadImage(fd);
    setUpload("Uploading...");
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <S.Flex flexDir="column" px="300px" w="100%" py="4rem">
      <S.Flex alignItems="center">
        <S.Flex position="relative" mr="0.7rem">
          <S.Box h="40px" w="40px" bg="darkblue" rounded="md"></S.Box>
          <S.Input
            position="absolute"
            type="file"
            name="file"
            id="file"
            className="custom-file-input"
            onChange={addFile}
            w="40px"
            h="40px"
            opacity="0"
          />
        </S.Flex>
        <S.Text fontSize="17px">Attatch an image</S.Text>
      </S.Flex>
      <S.Flex mt="1rem">
        {upload === "Uploading..." && <div>{upload}</div>}
      </S.Flex>
      <S.Flex mt="20px" w="100%">
        <S.Input
          type="text"
          placeholder="Title"
          spellCheck="false"
          maxLength="100"
          value={heading}
          onChange={handleHeadingChange}
        />
      </S.Flex>
      <S.Box my="30px" mt="15px" rounded="md" border="2px dashed #a6a6a690">
        <EditorWrapper>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            className="the-main-editor"
          />
        </EditorWrapper>
      </S.Box>
      <S.Button w="250px" onClick={handleSave}>
        <S.Text>{post.uploadedStatus ? "" : "Post"}</S.Text>
      </S.Button>
    </S.Flex>
  );
};

const EditorWrapper = styled.div`
  .DraftEditor-root {
    .DraftEditor-editorContainer {
      padding-bottom: 30rem;
      .public-DraftEditor-content div {
        font-size: 20px;
        margin: 20px;
        div {
          margin: 0;
        }
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post,
  };
};

export default connect(mapStateToProps, {
  uploadPost,
  uploadImage,
  clearPostID,
  dispatchPopup,
})(PostEditor);
