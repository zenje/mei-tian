import styled from "styled-components";

import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Word = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .word {
    width: 100%;
    font-size: 2rem;
  }
  .definition {
    width: 100%;
    padding-left: 1rem;
  }
  @media (min-width: 600px) {
    flex-direction: row;
    .word {
      width: 25%;
      text-align: right;
    }
    .definition {
      width: 75%;
      padding-left: 2rem;
    }
  }
`;
