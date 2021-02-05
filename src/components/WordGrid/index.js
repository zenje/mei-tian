import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function WordGrid(props) {
  const { endpoint, levels, title } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [wordData, setWordData] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(props.selectedLevel);

  const handleTab = (event, level) => {
    setSelectedLevel(level);
  };

  const handleData = (data) => {
    console.log("data", data);
    setWordData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetch(endpoint + selectedLevel)
      .then((res) => res.json())
      .then(handleData);
  }, [endpoint, selectedLevel]);

  if (isLoading || !wordData) {
    return (
      <>
        <h2>{title}</h2>
        <div>...loading</div>
      </>
    );
  }

  return (
    <>
      <h2>{title}</h2>
      <div>
        <Tabs
          value={selectedLevel}
          onChange={handleTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {levels.map((level) => (
            <Tab label={level} value={level} />
          ))}
        </Tabs>
      </div>
      <div>
        <Grid container spacing={3}>
          {wordData.map((word) => (
            <Grid item xs={2}>
              <Paper>{word.simp}</Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
