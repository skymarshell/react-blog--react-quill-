import React from "react";
import ImageResize from "quill-image-resize-module-react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

Quill.register("modules/imageResize", ImageResize);

function Text_Editor({
  value,
  setValue,
  readOnly = false,
  toolbar = true,
  className = "",
}) {
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <ReactQuill
      theme="snow"
      readOnly={readOnly}
      value={value}
      onChange={setValue}
      formats={formats}
      modules={toolbar ? modules : { toolbar: false }}
      className={`${className}`}
    />
  );
}

export default Text_Editor;
