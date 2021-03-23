import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, useLocation } from "react-router-dom";

import SimplifiedToggle from "components/SimplifiedToggle";
import { NAVIGATION_LINKS, TITLE } from "../../constants";

import {
  Content,
  Drawer,
  DrawerContent,
  DrawerWrapper,
  Header,
  MenuButtonWrapper,
  Title,
  SimplifiedToggleButton,
  StyledLink as Link,
  StyledSearchBar,
  StyledSearchIcon,
  StyledInput as Input,
} from "./style";

//const ListItemLink = (props) => <ListItem button {...props} />;

export default function Navigation(props) {
  const { content } = props;
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed">
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
            <Link to="/">{TITLE}</Link>
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
      <DrawerWrapper>
        <Drawer
          anchor="left"
          open={open}
          onOpen={handleDrawerOpen}
          onClose={handleDrawerClose}
        >
          <DrawerContent>
            <Header>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </Header>
            <Divider />
            <List>
              {NAVIGATION_LINKS.map((item, index) => (
                <ListItem
                  button
                  onClick={handleDrawerClose}
                  key={item.text}
                  selected={item.link === path}
                >
                  <Link to={item.link}>
                    <ListItemText primary={item.text} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </DrawerContent>
        </Drawer>
      </DrawerWrapper>
      <Content>{content}</Content>
    </>
  );
}
