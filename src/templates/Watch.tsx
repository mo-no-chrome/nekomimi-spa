import React from 'react';
import WatchDetails from '../organisms/WatchDetails';
import WatchPlayer from '../organisms/WatchPlayer';
import WatchTitleBar from '../organisms/WatchTitleBar';
import styles from './Watch.module.css';

interface Props {
  snippet: gapi.client.youtube.VideoSnippet;
  player: gapi.client.youtube.VideoPlayer;
}

const WatchTemplate = (props: Props) => {
  const { snippet, player } = props;
  return (
    <>
      <WatchTitleBar title={snippet.title!} />
      <div className={styles.content}>
        <WatchPlayer embedHTML={player.embedHtml!} />
        <WatchDetails snippet={snippet} />
      </div>
    </>
  );
};

export default WatchTemplate;
