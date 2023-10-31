import React, { useState } from 'react';
import styles from './spoiler.module.css';

function SpoilerText(props: any) {
  const [hidden, setHidden] = useState(true);

  const reveal = () => {
    setHidden(false);
  };

  return (
    <span
      className={hidden ? styles.text_hidden : styles.text_notHidden}
      onClick={reveal}
    >
      {props.children}
    </span>
  )
}

export default SpoilerText;