import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

export default function WordGrid(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [wordData, setWordData] = useState(null);
  const [type, setType] = useState("entry");

  const handleData = (data) => {
    console.log("data", data);
    setWordData(data);
    setIsLoading(false);
  };

  const handleTab = (type) => {
    setType(type);
  };

  useEffect(() => {
    fetch("/api/hsk3")
      .then((res) => res.json())
      .then(handleData);
  }, []);

  if (isLoading || !wordData) {
    return (
      <>
        <h2>hsk3 words:</h2>
        <div>...loading</div>
      </>
    );
  }

  return (
    <>
      <h2>hsk3 words:</h2>
      <button onClick={() => handleTab("entry")}>entry</button>
      <button onClick={() => handleTab("intermediate")}>intermediate</button>
      <button onClick={() => handleTab("advanced")}>advanced</button>
      <button onClick={() => handleTab("supplemental")}>supplemental</button>
      <div>
        <Grid container spacing={3}>
          {wordData[type].map((word) => (
            <Grid item xs={2}>
              <Paper>{word.simp}</Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
