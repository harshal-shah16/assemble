import React, {useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
import Button from "@material-ui/core/Button";
import {toast, ToastContainer} from 'material-react-toastify';

const TextEditor = ({content, onSubmit, onCancel, placeholder = ''}) => {
    const [html, setHtml] = useState(content);
    const [isTextChanged, setChanged] = useState(false);

    const handleEditorChange = newContent => {
        setHtml(newContent);
        setChanged(true);
    };
    const handleSubmit = () => {
        if (isTextChanged && html.length !== 0) {
            onSubmit(html)
        } else {
            toast.error("Please type > 0 characters.", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
    };
    const handleClose = () => {
        onCancel();
    };

    return (
        <div style={{padding: '30px 0'}}>
            <Editor
                apiKey="3c5jeot6pndx67pbh8nqe6z78e39qj00d07hsh3e4php7x5j"
                value={html}
                outputFormat="html"
                onEditorChange={handleEditorChange}
                init={{
                    placeholder: placeholder,
                    init_instance_callback: (editor) =>
                        editor.on("change", () => {
                            const value = editor.getContent();

                            if (value !== editor._lastChange) {
                                editor._lastChange = value;
                                handleEditorChange(value)
                            }
                        }),
                    menubar: false,
                    branding: false,
                    plugins: [
                        "advlist autolink lists link image",
                        "charmap print preview anchor help",
                        "searchreplace visualblocks code",
                        "insertdatetime media table paste wordcount",
                    ],
                    toolbar:
                    // eslint-disable-next-line no-multi-str
                        "undo redo | formatselect | bold italic | \
                                  alignleft aligncenter alignright | \
                                  bullist numlist outdent indent | help",

                    // this disables the TinyMCE context menu and shows the system one
                    contextmenu: false,
                }}
            />
            <div style={{float: 'right', paddingTop: '10px'}}>
                <Button style={{marginRight: '5px'}} onClick={handleClose}
                        color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" autoFocus>
                    Submit
                </Button>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

// hey redux here's the new value for 'new post', 'answer' or something else
export default TextEditor;
