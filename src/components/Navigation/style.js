import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { Link, useHistory } from "react-router-dom";

export const Title = styled.h1`
  display: none;
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
  margin-right: 2rem;
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
  }
`;

export const MenuButtonWrapper = styled.div`
  margin-right: ${(props) => (!props.open ? "16px" : "0px")};
  display: ${(props) => (!props.open ? "block" : "none")};
`;

export const Content = styled.div`
  flex-grow: 1;
  padding-top: 1rem;
  margin-left: ${(props) => (!props.open ? "-150px" : "0px")};
  transition: margin 0.2s ease-out;
`;
