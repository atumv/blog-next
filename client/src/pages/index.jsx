import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts } from '@/api/postsAPI';
import { Navbar } from '@/components/Navbar';
import { AddPostForm } from '@/components/AddPostForm';
import { PostsList } from '@/components/PostsList';
import styles from './styles.module.css';

const Index = () => {
  const showAddForm = useSelector((state) => state.posts.showAddForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Navbar />
      {showAddForm && <AddPostForm />}
      <PostsList />
    </div>
  );
};

export default Index;
