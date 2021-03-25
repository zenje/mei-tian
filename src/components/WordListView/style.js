import styled from "styled-components";
import Card from "@material-ui/core/Card";
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
  .word {
    width: 100%;
    font-size: 2rem;
    color: ${(props) => props.color};
    text-align: center;
  }
  b {
    color: ${(props) => props.accentColor};
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

export const WordCard = styled(Card)`
  margin-bottom: 1rem;
`;
