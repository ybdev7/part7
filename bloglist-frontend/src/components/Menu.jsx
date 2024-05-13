import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    // <div>
    //   <Link style={padding} to="/">
    //     blogs
    //   </Link>
    //   <Link style={padding} to="/users">
    //     users
    //   </Link>
    //   {user.name} is logged in
    //   <button onClick={handleLogout}>Logout</button>
    // </div>
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Box sx={{ ml: "auto" }}></Box>
        {user ? (
          <>
            {user.name} is logged in{" "}
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          </>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
