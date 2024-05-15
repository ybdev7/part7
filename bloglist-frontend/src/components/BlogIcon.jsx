import { Avatar } from "@mui/material";
import BookOutlinedIcon from "@mui/icons-material/Book";
import { useTheme } from "@emotion/react";

const BlogIcon = () => {
  const theme = useTheme();

  return (
    <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
      <BookOutlinedIcon color="secondary" />
    </Avatar>
  );
};

export default BlogIcon;
