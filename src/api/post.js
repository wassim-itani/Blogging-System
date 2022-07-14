const baseUrl = "https://blogr99.000webhostapp.com/api/post";

const createPost = (data) =>
  fetch(`${baseUrl}/createPost.php`, {
    method: "POST",
    body: data,
  });

const editPost = (data) =>
  fetch(`${baseUrl}/editPost.php`, {
    method: "POST",
    body: data,
  });

const getPosts = () => fetch(`${baseUrl}/getAllPosts.php`);
const getSinglePost = (postId) =>
  fetch(`${baseUrl}/getSinglePost.php?post_id=${postId}`);

const deletePost = (data) =>
  fetch(`${baseUrl}/deletePost.php`, {
    method: "POST",
    body: data,
  });

const likePost = (data) =>
  fetch(`${baseUrl}/likePost.php`, {
    method: "POST",
    body: data,
  });

const unlikePost = (data) =>
  fetch(`${baseUrl}/unlikePost.php`, {
    method: "POST",
    body: data,
  });

const addComment = (data) =>
  fetch(`${baseUrl}/addComment.php`, {
    method: "POST",
    body: data,
  });

export {
  createPost,
  editPost,
  getPosts,
  getSinglePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
};
