import sorter from "../utils/sorter";
import Blog from "./Blog";
import Togglable from "./Toggable";
import BlogForm from "./blogForm";

const Blogs = ({ blogs, like, deleteBlog, user, addBlog, newBlogFormRef }) => {
  return (
    <div>
      <Togglable buttonLabel="Create New Blog" ref={newBlogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogs.sort(sorter.likesComparerDESC).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={like}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default Blogs;
