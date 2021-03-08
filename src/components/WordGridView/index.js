import React from "react";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import { StyledCardContent as CardContent, StyledLink as Link } from "./style";

export default function WordGridView(props) {
  const { wordData } = props;

  return (
    <div>
      <Grid container spacing={3}>
        {wordData.map((word) => (
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Link to={`/word/${word.simp}`}>
              <Card>
                <CardContent>{word.simp}</CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
