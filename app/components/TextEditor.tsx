"use client";
import React from "react";
import Editor from "ckeditor5/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function TextEditor() {
  return (
    <CKEditor
      editor={Editor}
      data="<p>Hello from CKEditor 5!</p>"
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
    />
  );
}

export default TextEditor;
