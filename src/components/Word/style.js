import Card from '@material-ui/core/Card';
import styled from 'styled-components';

export const WordCard = styled(Card)`
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
  color: ${(props) => props.color};
`;

export const Definition = styled.div`
  b {
    color: ${(props) => props.accentColor};
  }
`;

export const Sentence = styled.p`
  .chinese {
    //color: ${(props) => props.chineseColor};
  }
  .english {
    color: ${(props) => props.englishColor};
  }
  .pinyin {
    color: ${(props) => props.pinyinColor};
  }
  b {
    color: ${(props) => props.accentColor};
  }
`;

export const HskInfo = styled.div`
  color: ${(props) => props.color};
`;
