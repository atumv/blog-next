import axios from 'axios';
import { setPosts, setSinglePost, addPost, changePost, removePost } from '@/store/postSlice';

const url = 'http://localhost:5000/api/posts';

export const fetchAllPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(url);
    dispatch(setPosts(data));
  } catch (err) {
    console.log(err);
  }
};

export const fetchSinglePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/${id}`);
    dispatch(setSinglePost(data));
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await axios.post(url, post);
    dispatch(addPost(data));
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${url}/${id}`, updatedPost);
    dispatch(changePost(data));
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${url}/${id}`);
    dispatch(removePost(data));
  } catch (err) {
    console.log(err);
  }
};
