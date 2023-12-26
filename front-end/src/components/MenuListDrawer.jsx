import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function MenuListDrawer({ renderUserButtons, NavLink, setOpen }) {
  const handleListItemClick = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        width: 250,
        px: 2,
        height: "100%",
        bgcolor: "#202C33",
        color: "#fff",
      }}
    >
      <nav>
        <List onClick={handleListItemClick}>
        {renderUserButtons()}
        </List>
      </nav>
    </Box>
  );
}
