import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { showAddForm } from '@/store/postSlice';
import styles from './styles.module.css';

export const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.navbar}>
      <h1>
        <Link href="/">
          <a className={styles.header}>Blog</a>
        </Link>
      </h1>
      {!id && (
        <button className={styles.addBtn} onClick={() => dispatch(showAddForm(true))}>
          New post
        </button>
      )}
    </div>
  );
};
