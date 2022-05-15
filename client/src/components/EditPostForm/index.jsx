import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileBase64 from 'react-file-base64';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePost } from '@/api/postsAPI';
import { tags } from '@/shared/constants';
import { postSchema } from '@/shared/postSchema';
import { setEditMode } from '@/store/postSlice';
import { Navbar } from '@/components/Navbar';
import styles from './styles.module.css';

export const EditPostForm = () => {
  const [file, setFile] = useState(currentPost?.image);
  const currentPost = useSelector((state) => state.posts.currentPost);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    const updatedPost = {
      ...data,
      image: file,
    };

    dispatch(updatePost(currentPost._id, updatedPost));
    reset();
    setFile(null);
    dispatch(setEditMode(false));
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <form className={styles.form} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.titleInput}
          defaultValue={currentPost?.title}
          {...register('title', { required: true })}
        />
        <input
          className={styles.subtitleInput}
          defaultValue={currentPost?.subtitle}
          {...register('subtitle', { required: true })}
        />
        <Controller
          name="tag"
          render={({ field }) => (
            <select className={styles.select} {...field}>
              {tags.map((tag, index) => (
                <option key={index}>{tag}</option>
              ))}
            </select>
          )}
          control={control}
          defaultValue={currentPost?.tag}
        />
        <textarea
          className={styles.contentInput}
          defaultValue={currentPost?.content}
          {...register('content', { required: true })}
        />
        {errors.title && <span className={styles.errorMsg}>Title is required</span>}
        {errors.subtitle && <span className={styles.errorMsg}>Subtitle is required</span>}
        {errors.content && <span className={styles.errorMsg}>Content is required</span>}
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        <div className={styles.buttonsContainer}>
          <button className={styles.cancelBtn} onClick={() => dispatch(setEditMode(false))}>
            Cancel
          </button>
          <button className={styles.updateBtn} type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
