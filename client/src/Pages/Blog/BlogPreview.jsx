import React, { useState, useEffect } from "react";
import { blog_content_get } from "../../../utils/indexedDB/blog_content";
import BlogTemplete from "../../Components/BlogTemplete";
import Text_Editor from "../../Components/Text_Editor";
import "./../../../styles/BlogTemplete.module.css";

function BlogPreview() {
  const [BlogPreviewContent, setBlogPreviewContent] = useState({
    topic: "",
    content: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      const content = await blog_content_get();
      setBlogPreviewContent(content);
    };

    fetchContent();

    const interval = setInterval(fetchContent, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="blog-preview">
      <h1 className="text-xl font-bold  text-center">Blog Preview </h1>
      <BlogTemplete>
        <Text_Editor
          value={BlogPreviewContent.content}
          readOnly={true}
          toolbar={false}
          className=""
        />
      </BlogTemplete>
    </div>
  );
}

export default BlogPreview;
