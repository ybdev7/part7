import { Link } from "react-router-dom";
import sorter from "../utils/sorter";
import Blog from "./Blog";
import Togglable from "./Toggable";
import BlogForm from "./blogForm";

const Blogs = ({ blogs, like, deleteBlog, user, addBlog, newBlogFormRef }) => {
  const borderStyle = { border: `1px solid grey` };
  return (
    <div>
      <Togglable buttonLabel="Create New Blog" ref={newBlogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogs.sort(sorter.likesComparerDESC).map((blog) => (
        <div key={`link_to_${blog.id}`} style={borderStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
