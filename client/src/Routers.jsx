import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import BlogCreate from "./Pages/Blog/BlogCreate";
import BlogPreview from "./Pages/Blog/BlogPreview";
import BlogView from "./Pages/Blog/BlogView";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "pages/blog/BlogCreate/:id?",
    element: <BlogCreate />,
  },
  {
    path: "pages/blog/BlogPreview",
    element: <BlogPreview />,
  },
  {
    path: "pages/blog/BlogView/:id",
    element: <BlogView />,
  },
]);

export default Routers;
