import styled from "styled-components";

import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  .MuiCard-root {
    background-color: transparent;
  }
`;
export const StyledCardContent = styled(CardContent)`
  color: white;
  font-size: 2rem;
`;
