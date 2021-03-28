import InputBase from '@material-ui/core/InputBase';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Title = styled.h1`
  display: none;
  margin: 0;
  @media (min-width: 600px) {
    display: block;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const StyledSearchBar = styled.div`
  position: relative;
  border-radius: 5%;
  background-color: rgba(255, 255, 255, 0.15);
  &:hover: {
    background-color: rgba(255, 255, 255, 0.25);
  }
  margin-left: 0;
  width: 100%;
  @media (min-width: 600px) {
    width: auto;
    margin-left: 24px;
  }
`;

export const StyledSearchIcon = styled.div`
  padding: 0px 16px;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  pointer-events: none;
  justify-content: center;
`;

export const StyledInput = styled(InputBase)`
  input {
    padding: 8px 8px 8px calc(1em + 32px);
    color: white;
  }
`;

export const ToggleButtonWrapper = styled.div`
  display: flex;
  // flex approach to floating button to right of app-bar
  margin-left: auto;
`;

export const SimplifiedToggleWrapper = styled.div`
  button.MuiButton-textSizeLarge {
    padding: 8px 0;
  }
`;

export const MenuButtonWrapper = styled.div`
  margin-right: ${(props) => (!props.open ? '16px' : '0px')};
  display: ${(props) => (!props.open ? 'block' : 'none')};
`;

export const DrawerWrapper = styled.div``;
export const Drawer = styled(SwipeableDrawer)`
  //width: 150px;
`;

export const DrawerContent = styled.div`
  width: 200px;
`;

export const ListIcon = styled.span`
  padding-right: 1rem;
  position: relative;
  top: 0.3rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: flex-end;
`;

export const Content = styled.div`
  flex-grow: 1;
  padding-top: 1rem;
`;
