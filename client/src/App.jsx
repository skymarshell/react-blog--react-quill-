import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import BlogList from "./Pages/Blog/BlogList";

function App() {
  return (
    <div>
      <Link to="/pages/blog/BlogCreate">Create Blog</Link>
      <BlogList />
    </div>
  );
}

export default App;
