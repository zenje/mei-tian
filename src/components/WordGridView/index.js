import React, { useContext } from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';

import { store } from 'store';

import { StyledCardContent as CardContent, StyledLink as Link } from './style';

const renderWord = (word, isSimplifiedMode, color) => {
  const displayedWord = isSimplifiedMode ? word.simp : word.trad;
  return (
    <Link to={`/word/${displayedWord}`}>
      <Card>
        <CardContent color={color}>{displayedWord}</CardContent>
      </Card>
    </Link>
  );
};

export default function WordGridView(props) {
  const { wordData } = props;
  const theme = useTheme();
  const wordColor = theme.palette.primary.light;

  const context = useContext(store);
  const { state } = context;
  const { isSimplifiedMode } = state;

  return (
    <div>
      <Grid container spacing={3}>
        {wordData.map((word) => (
          <Grid item xs={6} sm={4} md={3} lg={2}>
            {renderWord(word, isSimplifiedMode, wordColor)}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
