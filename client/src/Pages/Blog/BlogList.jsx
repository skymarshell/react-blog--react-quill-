import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_DOMAIN_FULL_URL } from "./../../../utils/export_env/export_env";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_DOMAIN_FULL_URL}/blog/get`);
        setBlogs(res.data.blog); // assuming `res.data.blog` is the array
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map((b, index) => (
        <div key={b.B_ID}>
          <Link to={`/pages/blog/BlogView/${b.B_ID}`}>Blog #{index + 1}</Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
