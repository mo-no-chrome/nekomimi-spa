import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

interface Props {
  title: string;
}

const WatchTitleBar = (props: Props) => {
  const { title } = props;
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default WatchTitleBar;
