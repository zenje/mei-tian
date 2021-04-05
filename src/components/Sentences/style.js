import styled from 'styled-components';

const Sentence = styled.p`
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

export default Sentence;
