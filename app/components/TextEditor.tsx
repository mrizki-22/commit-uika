"use client";
import React, { useState } from "react";
import Editor from "ckeditor5/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import parse from "html-react-parser";
import "@/app/ckeditor.css";

function TextEditor() {
  const [content, setContent] = useState("");
  const createMarkup = () => {
    return { __html: content };
  };

  return (
    <>
      <div>
        <CKEditor
          editor={Editor}
          config={{
            mediaEmbed: {
              previewsInData: true,
            },
          }}
          data="<p>Ketik sesuatu disini</p>"
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
            console.log({ event, editor, data });
          }}
        />
      </div>
      <div className="w-full bg-red-100">
        <h1>Content</h1>
        <div dangerouslySetInnerHTML={createMarkup()} className="ck-content"></div>
      </div>
    </>
  );
}

export default TextEditor;
