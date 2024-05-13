import { Link } from "react-router-dom";
import sorter from "../utils/sorter";
import Togglable from "./Toggable";
import BlogForm from "./blogForm";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const Blogs = ({ blogs, addBlog, newBlogFormRef }) => {
  const borderStyle = { border: `1px solid grey` };
  return (
    <div>
      <Togglable buttonLabel="Create New Blog" ref={newBlogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.sort(sorter.likesComparerDESC).map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* {blogs.sort(sorter.likesComparerDESC).map((blog) => (
        <div key={`link_to_${blog.id}`} style={borderStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))} */}
    </div>
  );
};

export default Blogs;
