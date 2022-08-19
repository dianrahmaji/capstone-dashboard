import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "super" }, { script: "sub" }],
    ["blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ direction: "rtl" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

function ReactQuill({ value, setValue }) {
  const onChange = (text) => {
    setValue(text);
  };

  return (
    <Quill
      theme="snow"
      placeholder="Type here"
      modules={modules}
      value={value}
      onChange={onChange}
    />
  );
}

export default ReactQuill;
