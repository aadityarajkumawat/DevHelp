import React from 'react';
import '@editorjs/header/dist/bundle';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import Code from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import parseJSON from '../../../utils/parseJSON';
import { connect } from 'react-redux';
import { uploadPost } from '../../../actions/getPostAction';
import EditorJs from 'react-editor-js';

const PostEditor = ({
    uploadPost,
    auth: { isAuthenticated },
    post,
    history,
}) => {
    const instanceRef = React.useRef(null);
    const [heading, setHeading] = React.useState('');

    const handleSave = async () => {
        if (isAuthenticated) {
            const savedData = await instanceRef.current.save();
            const htmlToSave = parseJSON(savedData);
            console.log(savedData);
            uploadPost({ heading: heading, content: htmlToSave });
            history.push('/');
        }
    };

    const handleHeadingChange = (e) => {
        const value = e.target.value;
        setHeading(value);
    };

    const tools = {
        header: Header,
        simpleImage: SimpleImage,
        code: Code,
        inlineCode: InlineCode,
    };
    return (
        <div className='d-flex flex-column editor-container-compose'>
            <div className='d-flex justify-content-center compose-heading'>
                <input
                    type='text'
                    placeholder='Title'
                    spellCheck='false'
                    maxLength='100'
                    value={heading}
                    onChange={handleHeadingChange}
                />
            </div>
            <EditorJs
                instanceRef={(instance) => (instanceRef.current = instance)}
                tools={tools}
            />
            <button className='btn btn-primary' onClick={handleSave}>
                {post.uploadedStatus && (
                    <span
                        className='spinner-border spinner-border-sm'
                        aria-hidden='true'></span>
                )}
                <span>{post.uploadedStatus ? '' : 'Post'}</span>
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

export default connect(mapStateToProps, { uploadPost })(PostEditor);
