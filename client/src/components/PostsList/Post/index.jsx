import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from './styles.module.css';

export const Post = (props) => {
  const { title, subtitle, content, tag, image, createdAt, _id } = props;

  const timeSince = (data) => {
    return moment(data).fromNow();
  };

  return (
    <div className={styles.post}>
      {image && (
        <div
          className={styles.image}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
      )}
      <h6 className={styles.time}>{timeSince(createdAt)}</h6>
      <Link href={`/${_id}`}>
        <a className={styles.linkContainer}>
          <h6 className={styles.title}>{title}</h6>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.content}>{content.substring(0, 250) + '...'}</p>
        </a>
      </Link>
      <span className={styles.tag}>{`${tag}`}</span>
    </div>
  );
};
