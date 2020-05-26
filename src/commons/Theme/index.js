import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  color: {
    primary: "#D32F2F",
    secondary: "#00BCD4",
    error: "#E64A19",
    textColor: "#FFFFFF",
    defaultTextColor: "#000000",
    hoverColor: "rgba(0,0,0,0.08)",
  },
  typography: {
    fontFamily: "roboto",
  },
  shape: {
    borderRadius: 4,
    backgroundColor: "#E040FB",
    textColor: "#FFFFFF",
    borderColor: "#CCCCCC",
  },
});
export default theme;
