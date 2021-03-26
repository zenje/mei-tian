import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
export const StyledCardContent = styled(CardContent)`
  font-size: 2rem;
  color: ${(props) => props.color};
`;
