import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

import SimplifiedToggle from "components/SimplifiedToggle";

import {
  Content,
  MenuButtonWrapper,
  Title,
  SimplifiedToggleButton,
  StyledLink as Link,
  StyledSearchBar,
  StyledSearchIcon,
  StyledInput as Input,
} from "./style";

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Navigation(props) {
  const { content } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <MenuButtonWrapper open={open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </MenuButtonWrapper>
          <Title>
            <Link to="/">mei-tian</Link>
          </Title>
          <StyledSearchBar>
            <StyledSearchIcon>
              <SearchIcon />
            </StyledSearchIcon>
            <Input
              placeholder="Search…"
              type="search"
              onChange={(event) => {
                console.log("event", event);
                console.log("event " + event.target.value);
              }}
              onKeyDown={(event) => {
                console.log("event.keyCode", event.keyCode);
                if (event.keyCode === 13) {
                  console.log("event onkeydown", event);
                  console.log("event onkeydown " + event.target.value);
                  const value = event.target.value;
                  history.push("/word/" + value);
                }
              }}
            />
          </StyledSearchBar>
          <SimplifiedToggleButton>
            <SimplifiedToggle />
          </SimplifiedToggleButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            { text: "Home", link: "/" },
            { text: "HSK2", link: "/hsk2" },
            { text: "HSK3", link: "/hsk3" },
          ].map((item, index) => (
            <Link to={item.link}>
              <ListItem button key={item.text}>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </SwipeableDrawer>
      <Content open={open}>{content}</Content>
    </>
  );
}
