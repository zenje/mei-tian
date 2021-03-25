import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e", // 01dp / 0.05 opacity
    },
    primary: {
      main: "#009688",
      light: "#52c7b8",
      dark: "#00675b",
    },
    secondary: {
      main: "#ef5350",
      light: "#ff867a",
      dark: "#b61825",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.6)",
    },
  },
  overrides: {
    MuiTouchRipple: {
      child: {
        backgroundColor: "#ff867a",
      },
    },
    MuiTabs: {
      indicator: {
        height: "4px",
      },
    },
    MuiTab: {
      selected: {
        color: "#ef5350", // secondary.main
      },
    },
  },
  /*overrides: {
    MuiPaper: {
      root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: 'rgba(255, 255, 255, 0.75)',
      },
    },
  }*/
});
