import { usePostContext } from "../../../context";
import PostItem from "../PostItem/PostItem";
import { Loader} from "../../ui";
import "./PostList.scss";

const PostList = () => {
  const {
    posts: [posts],
    postsStatus,
  } = usePostContext();

  return (
    <>
      {postsStatus.error && <p className="error-text">{postsStatus.error}</p>}
      {posts.filteredPosts[0] === -1 ? (
        <p className="no-results-text">No results found !</p>
      ) : (
        <ul className="post-list">
          {postsStatus.loading
            ? [1, 2, 3, 4, 5].map((index) => {
                return <Loader/>;
              })
            : posts.filteredPosts.map((post, index) => {
                return <PostItem key={post.id} index={index} {...post} />;
              })}
        </ul>
      )}
    </>
  );
};

export default PostList;
