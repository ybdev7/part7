import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";

const User = ({ user }) => {
  console.log("matched user=", user);
  if (!user) {
    return null;
  }

  return (
    <div>
      <Typography variant="h2">{user.name}</Typography>

      <Typography variant="h5">added blogs</Typography>
      <List>
        {user.blogs.map((b) => (
          // <ListItem key={`blog_${b.id}`}>{b.title}</ListItem>
          <ListItem key={`blog_${b.id}`}>
            <ListItemAvatar>
              <Avatar>
                <BookIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={b.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default User;
