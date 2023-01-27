import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography
} from "@mui/material"
import menuConfigs from "../../configs/menuConfigs"
import { setUser } from "../../redux/features/userSlice"

const UserMenu = () => {
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)

  const toggleMenu = (e) => setAnchorEl(e.currentTarget)

  return (
    <>
      {user && (
        <>
          <Button
            variant="outlined"
            onClick={toggleMenu}
            sx={{ textTransform: "none" }}
          >
            {user.displayName}
          </Button>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => dispatch(setUser(null))}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography>Sign Out</Typography>}
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  )
}

export default UserMenu
