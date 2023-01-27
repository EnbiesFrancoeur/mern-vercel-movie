import { createTheme } from "@mui/material/styles"
import { colors } from "@mui/material"

export const themeModes = {
  dark: "dark",
  light: "light"
}

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: { main: "#ff0000", contrastText: "#fff" },
            secondary: { main: "#f44336", contrastText: "#fff" },
            background: { default: "#000", paper: "#131313" }
          }
        : {
            primary: { main: "#ff0000" },
            secondary: { main: "#f44336" },
            background: { default: colors.grey["100"] }
          }

    return createTheme({
      palette: {
        mode,
        ...customPalette
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true }
        }
      }
    })
  }
}

export default themeConfigs
