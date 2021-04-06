import styled from 'styled-components';

const Sentence = styled.p`
  .english {
    color: ${(props) => props.theme.palette.text.secondary};
  }
  .pinyin {
    color: ${(props) => props.theme.palette.text.secondary};
  }
  b {
    color: ${(props) => props.theme.palette.secondary.light};
  }
`;

export default Sentence;
