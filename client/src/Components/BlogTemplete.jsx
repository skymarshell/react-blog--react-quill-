import React from "react";

function BlogTemplate({
  children,
  leftClassName = "",
  centerClassName = "",
  rightClassName = "",
}) {
  return (
    <div className="container mx-auto mt-4 mb-4">
      <div className="grid grid-cols-12 gap-4 p-4">
        <Blog_left className={leftClassName} />
        <Blog_center
          className={centerClassName}
          children={children}
        ></Blog_center>
        <Blog_right className={rightClassName} />
      </div>
    </div>
  );
}

const Blog_left = ({ className }) => {
  return (
    <div
      className={`md:col-span-3 col-span-12 border-1 border-gray-300  px-4 pt-2 ${className}`}
      id="blog-template-left"
    >
      ads
    </div>
  );
};

const Blog_right = ({ className }) => {
  return (
    <div
      className={`md:col-span-3 col-span-12 border-1 border-gray-300  px-4 pt-2 ${className}`}
      id="blog-template-left"
    >
      ads
    </div>
  );
};

const Blog_center = ({ className, children }) => {
  return (
    <div
      className={`md:col-span-6 col-span-12 border-1 border-gray-300 border-none ${className}`}
      id="blog-template-center"
    >
      {children}
    </div>
  );
};

export default BlogTemplate;
