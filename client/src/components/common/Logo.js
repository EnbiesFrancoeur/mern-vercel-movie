import { Typography, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Logo = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const logoOnClick = () => {
    navigate("/")
  }

  return (
    <Typography
      fontWeight="700"
      fontSize="1.7rem"
      onClick={logoOnClick}
      sx={{ cursor: "pointer" }}
    >
      Enbies<span style={{ color: theme.palette.primary.main }}>Flix</span>
    </Typography>
  )
}

export default Logo
