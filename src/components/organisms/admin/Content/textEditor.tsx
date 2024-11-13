// components/RichTextEditor.js
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextEditor = ({ onChange, value }) => {
  const [editorContent, setEditorContent] = useState(value || "");

  useEffect(() => {
    if (onChange) onChange(editorContent);
  }, [editorContent, onChange]);

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={setEditorContent}
        className="h-60 text-gray-700"
        placeholder="Tulis di sini..."
      />
    </div>
  );
};

export default RichTextEditor;
