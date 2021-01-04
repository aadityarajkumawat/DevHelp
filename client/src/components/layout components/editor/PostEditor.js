import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  uploadPost,
  uploadImage,
  clearPostID,
} from "../../../actions/getPostAction";
import { convertToRaw, Editor, EditorState, RichUtils } from "draft-js";

const PostEditor = ({
  uploadPost,
  auth: { isAuthenticated },
  post,
  history,
  uploadImage,
  clearPostID,
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
      console.log(JSON.stringify(postRawContent));
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
    <div className="d-flex flex-column editor-container-compose">
      <div className="img-upload">
        <input
          type="file"
          name="file"
          id="file"
          className="custom-file-input"
          onChange={addFile}
        />
        <div className="custom-upload post-post-btn">Upload Image</div>
        {upload === "Uploading..." && (
          <div className="img-loader">
            <div className="the-moving-grad"></div>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center compose-heading">
        <input
          type="text"
          placeholder="Title"
          spellCheck="false"
          maxLength="100"
          value={heading}
          onChange={handleHeadingChange}
        />
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        className="the-main-editor"
      />
      <button className="post-post-btn" onClick={handleSave}>
        <span>{post.uploadedStatus ? "" : "Post"}</span>
      </button>
    </div>
  );
};

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
})(PostEditor);
