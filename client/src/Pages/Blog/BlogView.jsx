import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // ❗ Correct import — no curly braces
import { API_DOMAIN_FULL_URL } from "./../../../utils/export_env/export_env";
import BlogTemplete from "../../Components/BlogTemplete";
import Text_Editor from "../../Components/Text_Editor";


function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function getBlog() {
      try {
        const res = await axios.get(`${API_DOMAIN_FULL_URL}/blog/get/${id}`);
        setBlog(res.data.blog[0]); // assuming blog is an array
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    }

    getBlog(); // ❗ Execute the async function
  }, [id]);

  return (
    <div className="w-full">
      <h2 className=" text-center">Blog ID: {id}</h2>
      {blog ? (
        <div id="blog-view">
          <p className=" text-center">Title</p>
          <div className="">
            <BlogTemplete>
              <Text_Editor
                value={blog.B_Content}
                toolbar={false}
                readOnly={true}
                className=""
              />
            </BlogTemplete>
          </div>
        </div>
      ) : (
        <p>Loading blog...</p>
      )}

      <div className="flex justify-center items-center">
        <Link to="/pages/Blog/BlogCreate" state={{blog}} className="btn btn-info">
          Update
        </Link>
      </div>
    </div>
  );
}

export default BlogView;
