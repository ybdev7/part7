import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/blogForm";
import Message from "./components/Message";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggable";
import sorter from "./utils/sorter";
import { showNotification } from "./reducers/notificatonReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const newBlogFormRef = useRef();

  const message = useSelector((state) => {
    return state.notification;
  });

  const showError = (error) => {
    setError(error);
    setTimeout(() => setError(""), 6000);
  };
  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("loggedBloglistUser");
    blogService.removeToken();

    dispatch(showNotification("Successfully logged out"));
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));

      setUsername("");
      setPassword("");
    } catch (exception) {
      showError("Wrong credentials");
    }
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      console.log("deleting.." + blog.id);
      try {
        const res = await blogService.deleteBlog(blog.id);
        console.log("done delete");

        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (ex) {
        console.log("!!Error ", ex);

        showError(ex.response.data.error);
      }
    }
  };
  const like = async (blog) => {
    try {
      const updatingBlog = { ...blog, likes: blog.likes + 1 };
      const updatedBlog = await blogService.update(updatingBlog);

      const upb = blogs.map((b) => {
        return b.id === updatedBlog.id ? updatedBlog : b;
      });

      //update blogs
      setBlogs(upb);
      return updatedBlog;
    } catch (ex) {
      console.log("!!Error ", ex);

      showError(ex.response.data.error);
      return null;
    }
  };
  const addBlog = async (newTitle, newAuthor, newUrl) => {
    try {
      console.log("saving ", newTitle);
      const blog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      });
      setBlogs(blogs.concat(blog));

      dispatch(showNotification(`Added ${newTitle}`));

      newBlogFormRef.current.toggleVisibility();

      return blog;
    } catch (ex) {
      console.log("!!Error ", ex);

      showError(ex.response.data.error);
      return null;
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  //get token, if previously logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  //App
  const msg = error !== "" ? error : message;
  if (user === null) {
    return (
      <div>
        <h2>Log in to Blogs</h2>
        <Message message={msg} isError={error !== ""} />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  console.log("blogs=", blogs);
  return (
    <div>
      <h2>Blogs</h2>
      <Message message={msg} isError={error !== ""} />
      <div>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
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

export default App;
