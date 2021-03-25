import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Looks2Icon from "@material-ui/icons/LooksTwo";
import Looks2OutlinedIcon from "@material-ui/icons/LooksTwoOutlined";
import Looks3Icon from "@material-ui/icons/Looks3";
import Looks3OutlinedIcon from "@material-ui/icons/Looks3Outlined";

export const TITLE = "mei-tian";

export const NAVIGATION_LINKS = [
  {
    icon: <HomeOutlinedIcon />,
    selectedIcon: <HomeIcon />,
    label: "Home",
    link: "/",
  },
  {
    icon: <Looks2OutlinedIcon />,
    selectedIcon: <Looks2Icon />,
    label: "HSK 2.0",
    link: "/hsk2",
  },
  {
    icon: <Looks3OutlinedIcon />,
    selectedIcon: <Looks3Icon />,
    label: "HSK 3.0",
    link: "/hsk3",
  },
  {
    icon: <HistoryIcon />,
    selectedIcon: <HistoryIcon />,
    label: "History",
    link: "/history",
  },
];

export const HSK2_TITLE = "HSK 2.0";
export const HSK2_LEVELS = [
  { label: "Level 1", value: 1 },
  { label: "Level 2", value: 2 },
  { label: "Level 3", value: 3 },
  { label: "Level 4", value: 4 },
  { label: "Level 5", value: 5 },
  { label: "Level 6", value: 6 },
];

export const HSK3_TITLE = "HSK 3.0";
export const HSK3_LEVELS = [
  { label: "Entry", value: "entry" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
  { label: "Supplemental", value: "supplemental" },
];
