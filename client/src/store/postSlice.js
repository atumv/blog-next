import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  currentPost: null,
  showAddForm: false,
  editMode: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      const postsReversed = action.payload.reverse();
      state.posts = postsReversed;
      state.editMode = false;
    },

    setSinglePost: (state, action) => {
      state.currentPost = action.payload;
    },

    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },

    changePost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });
      state.currentPost = action.payload;
    },

    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload._id);
      state.currentPost = null;
    },

    showAddForm: (state, action) => {
      state.showAddForm = action.payload;
    },

    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
  },
});

export const {
  setPosts,
  setSinglePost,
  addPost,
  changePost,
  removePost,
  showAddForm,
  setEditMode,
} = postSlice.actions;

export default postSlice.reducer;
