import Post from '../models/post';

export const showPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

export const findPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post ? res.json(post) : res.status(404).end();
};

export const addPost = async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
};

export const updatePost = async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPost);
};

export const removePost = async (req, res) => {
  const deletedPost = await Post.findByIdAndRemove(req.params.id);
  res.json(deletedPost);
};
