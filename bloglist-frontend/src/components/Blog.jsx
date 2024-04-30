import PropTypes from "prop-types";

const Blog = ({ blog, like, deleteBlog, user }) => {
  if (!user) {
    return null;
  }
  if (!blog) {
    return null;
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  const handleLike = (e) => {
    like(blog);
  };

  const authorizedToDelete =
    user.username.toString() == blog.user.username.toString();

  const externalUrl = blog.url.startsWith("https://")
    ? blog.url
    : `https://${blog.url}`;
  console.log(externalUrl);
  return (
    <div style={blogStyle}>
      <h2>
        {blog.title} by {blog.author}{" "}
      </h2>
      <p>
        Likes {blog.likes} <button onClick={handleLike}>Like</button>
      </p>
      <p>
        <a href={externalUrl}>{blog.url}</a>
      </p>
      <p>added by {blog.user.name}</p>

      <h3>Comments</h3>
      {blog.comments && blog.comments.length ? (
        <ul>
          {blog.comments.map((c) => (
            <li key={c.id}>{c.comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments</p>
      )}

      {authorizedToDelete && (
        <button
          onClick={() => {
            deleteBlog(blog);
          }}
        >
          Remove
        </button>
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
