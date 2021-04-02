import React from 'react';

import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks3OutlinedIcon from '@material-ui/icons/Looks3Outlined';
import Looks2Icon from '@material-ui/icons/LooksTwo';
import Looks2OutlinedIcon from '@material-ui/icons/LooksTwoOutlined';
import FlashOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
import FlashIcon from '@material-ui/icons/OfflineBoltRounded';

export const TITLE = 'mei-tian';

export const NAVIGATION_LINKS = [
  {
    icon: <HomeOutlinedIcon />,
    selectedIcon: <HomeIcon />,
    label: 'Home',
    link: '/',
  },
  {
    icon: <Looks2OutlinedIcon />,
    selectedIcon: <Looks2Icon />,
    label: 'HSK 2.0',
    link: '/hsk2',
  },
  {
    icon: <Looks3OutlinedIcon />,
    selectedIcon: <Looks3Icon />,
    label: 'HSK 3.0',
    link: '/hsk3',
  },
  {
    icon: <FlashOutlinedIcon />,
    selectedIcon: <FlashIcon />,
    label: 'Flashcards',
    link: '/flashcards',
  },
  {
    icon: <HistoryIcon />,
    selectedIcon: <HistoryIcon />,
    label: 'History',
    link: '/history',
  },
];

export const HSK2 = {
  ENDPOINT: '/api/hsk2/',
  TITLE: 'HSK 2.0',
  OPTIONS_LABEL: 'HSK 2.0 Level',
  VALUE: 'hsk2',
  LEVELS: [
    { label: 'Level 1', value: 1 },
    { label: 'Level 2', value: 2 },
    { label: 'Level 3', value: 3 },
    { label: 'Level 4', value: 4 },
    { label: 'Level 5', value: 5 },
    { label: 'Level 6', value: 6 },
  ],
};

export const HSK3 = {
  ENDPOINT: '/api/hsk3/',
  TITLE: 'HSK 3.0',
  OPTIONS_LABEL: 'HSK 3.0 Category',
  VALUE: 'hsk3',
  LEVELS: [
    { label: 'Entry', value: 'entry' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
    { label: 'Supplemental', value: 'supplemental' },
  ],
};

export const HSK_OPTIONS = [
  {
    label: HSK2.TITLE,
    value: HSK2.VALUE,
  },
  {
    label: HSK3.TITLE,
    value: HSK3.VALUE,
  },
];

export const FLASHCARD_NUMBER_OPTIONS = [
  {
    label: '5',
    value: '5',
  },
  {
    label: '10',
    value: '10',
  },
  {
    label: '20',
    value: '20',
  },
  {
    label: '50',
    value: '50',
  },
  {
    label: '100',
    value: '100',
  },
];
