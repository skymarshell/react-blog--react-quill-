import React, { useEffect, useState, useRef } from "react";
import Text_Editor from "../../Components/Text_Editor";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { blog_content_save } from "../../../utils/indexedDB/blog_content";
import BlogTemplete from "../../Components/BlogTemplete";
import { CreateBlog } from "../../../Engine/BlogEngine";
import "./../../../styles/BlogTemplete.module.css";

function BlogCreate() {
  const location = useLocation();
  let navigate = useNavigate();
  const [debug] = useState(false);
  const [editorContent, setEditorContent] = useState({
    topic: "",
    content: "",
  });
  const buttonRef = useRef(null);
  const updateBlog = useRef(null);

  // ตัว update
  useEffect(() => {
    const currentBlog = location.state?.blog;
    if (currentBlog) {
      setEditorContent({
        topic: currentBlog.B_Topic || "",
        content: currentBlog.B_Content || "",
      });
      if (buttonRef.current) {
        buttonRef.current.textContent = "Update";
      }
      updateBlog.current = currentBlog;
    }
  }, [location.state?.blog]);

  useEffect(() => {
    const saveToDB = async () => {
      await blog_content_save(editorContent);
    };
    saveToDB();
  }, [editorContent]);

  function btnCreateBlog(editorContent) {
    try {
      CreateBlog(editorContent, updateBlog.current)
        .then((response) => {
          if (response) {
            alert(response.message);
            navigate(`/pages/blog/BlogView/${response.B_ID}`);
          }
        })
        .catch((error) => {
          alert("Error creating blog: " + error);
        });
    } catch (error) {
      alert("Error : ", error);
    }
  }

  return (
    <div id="blog-create">
      <h1 className="text-xl font-bold mb-4 text-center">Blog Create </h1>
      <div className="text-center mb-4">
        <Link
          to="/pages/blog/BlogPreview"
          target="_blank"
          className="btn btn-primary text-white font-bold py-2 px-4 rounded mb-4"
        >
          Preview
        </Link>
      </div>

      <BlogTemplete
        leftClassName="md:mt-[81px]"
        rightClassName="md:mt-[81px]"
        centerClassName="mt-3"
      >
        <Text_Editor
          value={editorContent.content}
          setValue={(val) => {
            setEditorContent({
              ...editorContent,
              content: val,
            });
          }}
          className=""
        />
      </BlogTemplete>

      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          ref={buttonRef}
          onClick={() => btnCreateBlog(editorContent)}
        >
          Create Blog
        </button>
      </div>

      {/* raw tags (open this might lag.) */}
      {debug && (
        <div className="container mx-auto text-center">{editorContent}</div>
      )}
    </div>
  );
}

export default BlogCreate;
