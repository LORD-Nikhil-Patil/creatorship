import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Jodit } from 'jodit';
import JoditReact from "jodit-react";
// import { FileUpload } from '../../services/cloudinaryService';

const JoditEditor = () => {
    const editorRef = useRef(null);

    const [editorContent, setEditorContent] = useState('');

    const editorConfig = {
        readonly: false,
        autofocus: true,
        tabIndex: 1,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: 'insert_clear_html',
        placeholder: 'Write something awesome ...',
        beautyHTML: true,
        toolbarButtonSize: "large",
        buttons: [
            'source',
            '|', 'bold', 'italic',
            '|', 'ul', 'ol',
            '|', 'font', 'fontsize', 'brush', 'paragraph',
            '|', 'video', 'table', 'link',
            '|', 'left', 'center', 'right', 'justify',
            '|', 'undo', 'redo',
            '|', 'hr', 'eraser', 'fullsize'
        ],
        extraButtons: ["uploadImage", "codeBlock"]
    };

    useEffect(() => {
        uploadImageButton();
        codeBlockButton();
    }, []);

    const uploadImageButton = useCallback(() => {
        Jodit.defaultOptions.controls.uploadImage = {
            name: 'Upload image to Cloudinary',
            iconURL: "https://www.kindpng.com/picc/m/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png",
            exec: async (editor) => {
                await imageUpload(editor);
            }
        };
    }, []);

    const codeBlockButton = useCallback(() => {
        Jodit.defaultOptions.controls.codeBlock = {
            name: 'Code Block',
            iconURL: "https://cdn.icon-icons.com/icons2/2406/PNG/512/codeblock_editor_highlight_icon_145997.png",
            exec: async (editor) => {
                const pre = editor.selection.j.createInside.element('pre');
                pre.style = 'background-color:#F0F0F0; text-align:left; padding:10px';
                pre.innerHTML = `${editor.selection.html}`;
                editor.selection.insertNode(pre);
            },
        };
    }, []);

    const imageUpload = useCallback((editor) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async function () {
            const imageFile = input.files[0];

            if (!imageFile) {
                return;
            }

            if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
                return;
            }

            // const imageInfo = await FileUpload(imageFile);

            // insertImage(editor, imageInfo.url);
        };
    }, []);

    const insertImage = (editor, url) => {
        const image = editor.selection.j.createInside.element('img');
        image.setAttribute('src', url);
        editor.selection.insertNode(image);
    };

    const handleChange = (value) => { };

    const handleBlur = (newContent) => {
        setEditorContent(newContent);
    };

    return (
        <React.Fragment>
            <JoditReact
                ref={editorRef}
                value={editorContent}
                config={editorConfig}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </React.Fragment>
    );
};

export default JoditEditor;
