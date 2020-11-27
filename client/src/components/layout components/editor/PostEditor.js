import React from "react";
import parseJSON from "../../../utils/parseJSON";
import { connect } from "react-redux";
import {
  uploadPost,
  uploadImage,
  clearPostID,
} from "../../../actions/getPostAction";
import {
  ContentState,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";

const PostEditor = ({
  uploadPost,
  auth: { isAuthenticated },
  post,
  history,
  uploadImage,
  clearPostID,
}) => {
  const instanceRef = React.useRef(null);
  const [heading, setHeading] = React.useState("");
  const [upload, setUpload] = React.useState("");
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  React.useEffect(() => {
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

  const uploadingStyles =
    upload === "Uploading..." ? { color: "orange" } : { color: "green" };

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
      <input
        type="file"
        name="file"
        id="file"
        className="custom-file-input"
        onChange={addFile}
      />
      <span style={uploadingStyles}>{upload}</span>
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
      />
      <button className="" onClick={handleSave}>
        {post.uploadedStatus && (
          <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
        )}
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
