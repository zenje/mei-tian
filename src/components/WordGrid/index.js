import React, { useState, useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import ListIcon from '@material-ui/icons/ListRounded';
import GridIcon from '@material-ui/icons/ViewModuleRounded';

import WordGridView from 'components/WordGridView';
import WordListView from 'components/WordListView';

import { GridListButton, TabsContainer } from './style';

const renderGridListButton = (isGridView, toggleViewFn) => {
  const icon = isGridView ? (
    <ListIcon style={{ fill: 'white' }} />
  ) : (
    <GridIcon style={{ fill: 'white' }} />
  );
  return (
    <GridListButton>
      <IconButton onClick={toggleViewFn}>{icon}</IconButton>
    </GridListButton>
  );
};

const renderWords = (isGridView, wordData) =>
  isGridView ? (
    <WordGridView wordData={wordData} />
  ) : (
    <WordListView wordData={wordData} />
  );

const getTabs = (selectedLevel, handleTab, levels) => (
  <TabsContainer>
    <Paper>
      <Tabs
        value={selectedLevel}
        onChange={handleTab}
        indicatorColor="secondary"
        textColor="text"
        variant="scrollable"
        scrollButtons="on"
      >
        {levels.map((item) => (
          <Tab label={item.label} value={item.value} />
        ))}
      </Tabs>
    </Paper>
  </TabsContainer>
);

export default function WordGrid(props) {
  const { endpoint, levels, title } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [wordData, setWordData] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(props.selectedLevel);
  const [isGridView, setIsGridView] = useState(true);

  const handleTab = (event, level) => {
    setIsLoading(true);
    setSelectedLevel(level);
  };

  const handleData = (data) => {
    console.log('data', data);
    setWordData(data);
    setIsLoading(false);
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  useEffect(() => {
    fetch(endpoint + selectedLevel)
      .then((res) => res.json())
      .then(handleData);
  }, [endpoint, selectedLevel]);

  return (
    <>
      <h2>{title}</h2>
      {getTabs(selectedLevel, handleTab, levels)}
      {renderGridListButton(isGridView, toggleView)}
      {isLoading || !wordData ? (
        <div>...loading</div>
      ) : (
        renderWords(isGridView, wordData)
      )}
    </>
  );
}
