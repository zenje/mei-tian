import Card from '@material-ui/core/Card';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 25rem;
  margin: 1rem;
  padding: 0 1rem;
  @media (min-width: 600px) {
    max-width: 40rem;
  }
  @media (min-width: 960px) {
    max-width: 45rem;
  }
  @media (min-width: 1280px) {
    max-width: 50rem;
  }
`;

export const WordTitle = styled.h1`
  color: ${(props) => props.theme.palette.primary.light};
`;

export const Definition = styled.div`
  b {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

export const HskInfo = styled.div`
  color: ${(props) => props.theme.palette.text.secondary};
`;
