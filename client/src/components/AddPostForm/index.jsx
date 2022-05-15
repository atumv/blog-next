import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FileBase64 from 'react-file-base64';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPost } from '@/api/postsAPI';
import { tags } from '@/shared/constants';
import { postSchema } from '@/shared/postSchema';
import { showAddForm } from '@/store/postSlice';
import styles from './styles.module.css';

export const AddPostForm = () => {
  const [file, setFile] = useState(null);
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
    dispatch(createPost({ ...data, createdAt: Date.now(), image: file }));
    clearForm();
  };

  const clearForm = () => {
    reset();
    setFile(null);
    dispatch(showAddForm(false));
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalFade} onClick={() => dispatch(showAddForm(false))}></div>
      <div className={styles.modalWindow}>
        <h5 className={styles.formHeader}>Create new post</h5>
        <form
          className={styles.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className={styles.titleInput}
            placeholder="Title"
            autoFocus
            {...register('title', { required: true })}
          />
          <input
            className={styles.subtitleInput}
            placeholder="Subtitle"
            {...register('subtitle', { required: true })}
          />
          <Controller
            name="tag"
            render={({ field }) => (
              <select className={styles.select} {...field}>
                {tags.map((tag, idx) => (
                  <option key={idx}>{tag}</option>
                ))}
              </select>
            )}
            control={control}
            defaultValue={tags[0]}
          />
          <textarea
            className={styles.contentInput}
            placeholder="Text"
            required
            {...register('content', { required: true })}
          />
          {errors.title && <span className={styles.errorMsg}>Title is required</span>}
          {errors.subtitle && <span className={styles.errorMsg}>Subtitle is required</span>}
          {errors.content && <span className={styles.errorMsg}>Content is required</span>}
          <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
          <button className={styles.cancelBtn} onClick={clearForm}>
            Cancel
          </button>
          <button
            className={styles.submitBtn}
            type="submit"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
