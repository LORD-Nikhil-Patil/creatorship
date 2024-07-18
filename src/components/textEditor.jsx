import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Jodit } from 'jodit';
import JoditReact from "jodit-react";
// import { FileUpload } from '../../services/cloudinaryService';

const JoditEditor = ({setEditorData}) => {

    const [editorContent, setEditorContent] = useState('');

    const editorConfig = {
        readonly: false,
        toolbar: true,
        spellcheck: true,
        language: 'en',
        toolbarButtonSize: 'medium',
        // toolbarAdaptive: false,
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
        //defaultActionOnPaste: "insert_clear_html",
        // buttons: buttons,
        uploader: {
            insertImageAsBase64URI: true
        },
        width: 800,
        minHeight: 400,
        controls: {
            font: {
                command: 'fontname',
                list: {
                    "'Open Sans',sans-serif": 'Open Sans',
                    'Helvetica,sans-serif': 'Helvetica',
                    'Arial,Helvetica,sans-serif': 'Arial',
                    'Georgia,serif': 'Georgia',
                    'Impact,Charcoal,sans-serif': 'Impact',
                    'Tahoma,Geneva,sans-serif': 'Tahoma',
                    "'Times New Roman',Times,serif": 'Times New Roman',
                    'Verdana,Geneva,sans-serif': 'Verdana',
                    'Consolas,monaco,monospace': 'Consolas'
                }
            }
        }
    };

    const handleChange = (value) => { 
    };

    const handleBlur = (newContent) => {
        setEditorContent(newContent)
        // const content = Jodit.modules.Helpers.stripTags(editorContent)
        setEditorData(editorContent)
    };

    return (
        <React.Fragment>
            <JoditReact
                value={editorContent}
                config={editorConfig}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </React.Fragment>
    );
};

export default memo(JoditEditor);
