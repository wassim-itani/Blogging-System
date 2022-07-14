import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  UnOrderedListIcon,
  OrderedListIcon,
} from "../../../assets/editor";
import "./TextEditor.scss";

const TextEditor = ({ editorState, handleEditorChange }) => {
  
  const toolbarOptions = {
    options: ["inline", "blockType", "list"],
    inline: {
      inDropdown: false,
      options: ["bold", "italic", "underline"],
      bold: { icon: BoldIcon, className: undefined },
      italic: { icon: ItalicIcon, className: undefined },
      underline: { icon: UnderlineIcon, className: undefined },
    },
    blockType: {
      inDropdown: true,
      options: ["Normal", "H2", "H3"],
    },
    list: {
      inDropdown: false,
      options: ["unordered", "ordered"],
      unordered: { icon: UnOrderedListIcon, className: undefined },
      ordered: { icon: OrderedListIcon, className: undefined },
    },
  };

  return (
    <Editor
      wrapperClassName="editor-wrapper"
      toolbar={toolbarOptions}
      editorState={editorState}
      toolbarClassName="editor-toolbar"
      editorClassName="editor-area"
      onEditorStateChange={handleEditorChange}
      stripPastedStyles={true}
    />
  );
};

export default TextEditor;
