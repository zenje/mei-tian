import styled from "styled-components";

import Tabs from "@material-ui/core/Tabs";

export const TabsContainer = styled.div`
  width: 100%;
  // fix material-ui issue with scrollable tabs not being centered
  .MuiTabs-root {
    justify-content: center;
  }
  .MuiTabs-scroller {
    flex-grow: 0;
  }
`;

export const GridListButton = styled.div`
  width: 100%;
  text-align: right;
`;
