import { Typography } from '@material-ui/core';
import React from 'react';
import styles from './WatchDetails.module.css';

interface Props {
  snippet: gapi.client.youtube.VideoSnippet;
}

const WatchDetails = (props: Props) => {
  const { snippet } = props;
  return (
    <div className={styles.wrapper}>
      <Typography variant="subtitle2">{snippet.title!}</Typography>
      <Typography variant="caption">{snippet.description!}</Typography>
    </div>
  );
};

export default WatchDetails;
