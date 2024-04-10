import { Link } from "react-router-dom";

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.name} is logged in
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Menu;
