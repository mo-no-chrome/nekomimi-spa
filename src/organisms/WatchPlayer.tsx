import React from 'react';
import styles from './WatchPlayer.module.css';

interface Props {
  embedHTML: string;
}

const WatchPlayer = (props: Props) => {
  const { embedHTML } = props;
  /* eslint-disable react/no-danger */
  return (
    <div
      className={styles.wrapper}
      dangerouslySetInnerHTML={{ __html: embedHTML }}
    />
  );
  /* eslint-enable react/no-danger */
};

export default WatchPlayer;
