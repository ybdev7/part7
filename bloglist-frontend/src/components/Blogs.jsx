import { Link } from "react-router-dom";
import sorter from "../utils/sorter";
import Togglable from "./Toggable";
import BlogForm from "./blogForm";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import BlogIcon from "./BlogIcon";

const Blogs = ({ blogs, addBlog, newBlogFormRef }) => {
  return (
    <div>
      <Togglable buttonLabel="Create New Blog" ref={newBlogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      <div>
        <List>
          {blogs.sort(sorter.likesComparerDESC).map((blog) => (
            <ListItem key={blog.id}>
              <ListItemAvatar>
                <BlogIcon />
              </ListItemAvatar>
              <ListItemText>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                <Typography variant="body2">by {blog.author}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Blogs;
