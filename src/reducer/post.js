const postReducer = (posts, { type, payload }) => {
  switch (type) {
    case "ADD_POST":
      return { ...posts, allPosts: [payload, ...posts.allPosts] };
    case "EDIT_POST":
      const afterEditingPosts = posts.allPosts.map((post) => {
        return post.id == payload.id
          ? {
              ...post,
              image: payload.image,
              title: payload.title,
              content: payload.content,
              category: payload.category,
            }
          : post;
      });
      return { ...posts, allPosts: afterEditingPosts };
    case "ADD_FETCHED_POSTS":
      return { allPosts: payload, filteredPosts: payload };
    case "FILTER_POSTS":
      let postsList;
      postsList = posts.allPosts.filter((post) => {
        return payload.category == 0
          ? true
          : post.category.id === payload.category;
      });

      if (postsList.length === 0) {
        return { ...posts, filteredPosts: [-1] };
      }

      if (payload.sortBy === "Top") {
        postsList = postsList.sort((a, b) => b.likes.length - a.likes.length);
      }

      return { ...posts, filteredPosts: postsList };
    case "DELETE_POST":
      const afterDeletionPosts = posts.allPosts.filter(
        (post) => post.id != payload
      );
      const afterDeletionFiltered = posts.filteredPosts.filter(
        (post) => post.id != payload
      );
      return {
        allPosts: afterDeletionPosts,
        filteredPosts: afterDeletionFiltered,
      };
    case "LIKE_POST":
      const afterLikingPosts = posts.allPosts.map((post) => {
        return post.id == payload.postId
          ? { ...post, likes: [...post.likes, payload.username] }
          : post;
      });
      return { ...posts, allPosts: afterLikingPosts };
    case "UNLIKE_POST":
      const afterUnlikingPosts = posts.allPosts.map((post) => {
        return post.id == payload.postId
          ? {
              ...post,
              likes: [
                ...post.likes.filter(
                  (username) => username !== payload.username
                ),
              ],
            }
          : post;
      });
      return { ...posts, allPosts: afterUnlikingPosts };
    case "ADD_COMMENT":
      const afterCommentingPosts = posts.allPosts.map((post) => {
        return post.id == payload
          ? { ...post, comments: post.comments + 1 }
          : post;
      });
      return { ...posts, allPosts: afterCommentingPosts };
  }
};

export default postReducer;
