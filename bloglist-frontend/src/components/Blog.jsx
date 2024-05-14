import PropTypes from "prop-types";
import blogs from "../services/blogs";
import { useState } from "react";
import {
  Button,
  Container,
  FormLabel,
  Grid,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

const Blog = ({ blog, like, deleteBlog, commentBlog, user }) => {
  const [comments, setComments] = useState(blog.comments);
  const [comment, setComment] = useState("");
  if (!user) {
    return null;
  }
  if (!blog) {
    return null;
  }

  const handleLike = (e) => {
    like(blog);
  };

  const addComment = async () => {
    const updatedBlog = await commentBlog(blog, comment); //const updatedBlog = await blogs.comment(blog, comment);
    setComments(updatedBlog.comments);
    setComment("");
  };
  const authorizedToDelete =
    user.username.toString() == blog.user.username.toString();

  const externalUrl = blog.url.startsWith("https://")
    ? blog.url
    : `https://${blog.url}`;
  console.log(externalUrl);
  return (
    <div>
      <Typography variant="h3">
        {blog.title} by {blog.author}
      </Typography>
      <Typography variant="h6" component="label">
        Likes {blog.likes}
      </Typography>
      <Button size="small" variant="outlined" onClick={handleLike}>
        Like
      </Button>
      <div>
        <Link href={externalUrl}>{blog.url}</Link>
      </div>
      <Typography variant="h6">added by {blog.user.name}</Typography>
      <div>
        {authorizedToDelete && (
          <Button
            variant="contained"
            onClick={() => {
              deleteBlog(blog);
            }}
          >
            Remove Blog
          </Button>
        )}
      </div>
      <Typography variant="h3">Comments</Typography>
      <Grid display="flex" justifyContent="left" alignItems="center" container>
        <Grid item>
          <TextField
            size="small"
            margin="normal"
            label="Comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </Grid>
        <Grid item>
          <Button size="small" variant="outlined" onClick={addComment}>
            Add Comment
          </Button>
        </Grid>
      </Grid>
      {comments && comments.length ? (
        <List dense={true}>
          {comments.map((c) => (
            <ListItem key={`comment-${c._id}`}>{c.comment}</ListItem>
          ))}
        </List>
      ) : (
        <FormLabel>No comments</FormLabel>
      )}
    </div>
  );
};

Blog.propTypes = {
  //  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  //user: PropTypes.object.isRequired,
};
export default Blog;
