import { createMuiTheme } from '@material-ui/core/styles';

const BASE_PALETTE = {
  type: 'light',
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
};

const DARK_PALETTE = {
  ...BASE_PALETTE,
  type: 'dark',
  background: {
    default: '#121212',
    paper: '#1e1e1e', // 01dp / 0.05 opacity
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.6)',
  },
};

const OVERRIDES = {
  MuiListItem: {
    root: {
      '&$selected, &$selected:hover': {
        backgroundColor: 'inherit',
        fontWeight: 'bold',
        color: BASE_PALETTE.secondary.main,
      },
    },
    gutters: {
      paddingLeft: '0px',
    },
    selected: {
      '& div.MuiListItemText-root': {
        paddingLeft: 'calc(1.2rem - 4px)', // subtract border width
        borderLeft: `4px solid ${BASE_PALETTE.secondary.main}`,
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
      color: BASE_PALETTE.secondary.main,
    },
  },
  MuiTabs: {
    indicator: {
      height: '3px',
    },
  },
  MuiTouchRipple: {
    child: {
      backgroundColor: BASE_PALETTE.secondary.light,
    },
  },
};

export const getTheme = (isLightMode) =>
  createMuiTheme({
    palette: isLightMode ? BASE_PALETTE : DARK_PALETTE,
    overrides: OVERRIDES,
  });
