import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  display: flex;
`;

export const Main = styled.div`
  flex-grow: 1;
  padding: 1rem;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const ToolbarSpacing = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 2rem;
`;
