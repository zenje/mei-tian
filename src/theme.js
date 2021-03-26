import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e', // 01dp / 0.05 opacity
    },
    primary: {
      main: '#009688',
      light: '#52c7b8',
      dark: '#00675b',
    },
    secondary: {
      main: '#ef5350',
      light: '#ff867a',
      dark: '#b61825',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
  },
  overrides: {
    MuiListItem: {
      root: {
        '&$selected, &$selected:hover': {
          backgroundColor: 'inherit',
          fontWeight: 'bold',
          color: '#ef5350',
        },
      },
      gutters: {
        paddingLeft: '0px',
      },
      selected: {
        '& div.MuiListItemText-root': {
          paddingLeft: 'calc(1.2rem - 4px)', // subtract border width
          borderLeft: '4px solid #ef5350',
        },
      },
    },
    MuiListItemText: {
      root: {
        paddingLeft: '1.2rem',
      },
    },
    MuiTab: {
      selected: {
        color: '#ef5350', // secondary.main
      },
    },
    MuiTabs: {
      indicator: {
        height: '3px',
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: '#ff867a',
      },
    },
  },
});
