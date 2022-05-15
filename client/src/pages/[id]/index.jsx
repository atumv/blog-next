import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSinglePost, deletePost } from '@/api/postsAPI';
import { EditPostForm } from '@/components/EditPostForm';
import { Navbar } from '@/components/Navbar';
import { setEditMode } from '@/store/postSlice';
import styles from './styles.module.css';

const PostDetails = () => {
  const currentPost = useSelector((state) => state.posts.currentPost);
  const editMode = useSelector((state) => state.posts.editMode);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const removePost = () => {
    dispatch(deletePost(currentPost._id));
    router.push('/');
  };

  const timeSince = (data) => {
    return moment(data).fromNow();
  };

  return (
    <div>
      {editMode ? (
        <EditPostForm />
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.controls}>
              <button className={styles.editBtn} onClick={() => dispatch(setEditMode(true))}>
                Edit
              </button>
              <button className={styles.deleteBtn} onClick={removePost}>
                Delete
              </button>
            </div>
            <div className={styles.imageContainer}>
              {currentPost?.image && (
                <img className={styles.image} src={currentPost?.image} alt="img" />
              )}
            </div>
            <h5 className={styles.title}>{currentPost?.title}</h5>
            <p className={styles.subtitle}>{currentPost?.subtitle}</p>
            <p className={styles.time}>{timeSince(currentPost?.createdAt)}</p>
            <span className={styles.tag}>{currentPost?.tag}</span>
            <p className={styles.content}>{currentPost?.content}</p>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default PostDetails;
