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
  /* navigation menu styling */
  MuiListItem: {
    root: {
      '&$selected, &$selected:hover': {
        backgroundColor: 'inherit',
        color: BASE_PALETTE.secondary.main,
      },
    },
    selected: {
      '& div.MuiListItemText-root': {
        paddingLeft: '1rem', // subtract border width
        borderLeft: `0.25rem solid ${BASE_PALETTE.secondary.main}`,
      },
    },
  },
  MuiListItemText: {
    root: {
      paddingLeft: '1.25rem',
    },
  },
  /* HSK view tab styling */
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
  /* form styling */
  MuiFormControl: {
    root: {
      margin: '0.5rem',
      minWidth: '12rem',
    },
  },
  MuiSelect: {
    root: {
      width: '12rem',
    },
    select: {
      textAlign: 'left',
      padding: '0.5rem 1rem',
    },
    selectMenu: {
      whiteSpace: 'normal',
    },
  },
  MuiChip: {
    root: {
      margin: '0.25rem',
    },
  },
};

export const getTheme = (isLightMode) =>
  createMuiTheme({
    palette: isLightMode ? BASE_PALETTE : DARK_PALETTE,
    overrides: OVERRIDES,
  });
