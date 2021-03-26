import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  width: 100%;
`;

export const Main = styled.div`
  flex-grow: 1;
  padding: 1rem;
  //background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  font-size: calc(10px + 2vmin);
  //font-size: calc(1vw + 1vh + .5vmin);
  /*
  h1 {
    font-size: 5.9vw;
  }
  h2 {
      font-size: 3.0vh;
  }
  p {
      font-size: 2vmin;
  }*/
`;

export const ToolbarSpacing = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 2rem;
`;
