import {Editor, Text, Transforms} from 'slate';

export type FormatType = 'bold' | 'italic' | 'underline';

export const isFormatActive = (editor: Editor, format: FormatType) : boolean => {
    const marks = Editor.marks(editor);

    return marks? marks[format] === true: false;
}

export const toggleFormat = (editor: Editor, format: FormatType): void => {
    const isActive = isFormatActive(editor, format);

    Transforms.setNodes(
        editor, 
        { [format] : isActive ? null : true},
        {
            match: n => Text.isText(n),
            split: true
        }
    )
}