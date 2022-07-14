import { Link } from "react-router-dom";
import { useUserContext, usePostContext } from "../../context";
import { deletePost } from "../../api/post";
import "./Dashboard.scss";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Dashboard = () => {

  const {
    posts: [posts, postsDispatch],
  } = usePostContext();

  const [user] = useUserContext();

  useDocumentTitle("Dashboard - BLOGR");

  const userPosts = posts.allPosts.filter(
    (post) => post.user.username === user.username
  );

  const removePost = (e, postId) => {
    e.stopPropagation();

    const action = async () => {
      try {
        const formData=new FormData();
        formData.append('post_id',postId);
        const res = await deletePost(formData);
        if (!res.ok) {
          throw new Error();
        }
        postsDispatch({ type: "DELETE_POST", payload: postId });
      } catch (err) {
        console.log(err);
      }
    };
    action();
  };

  return (
    <section className="dashboard">
      <h1 className="dashboard-title">Your Posts:</h1>
      {userPosts.length === 0 ? (
        <p className="dashboard-empty-text">No published posts yet</p>
      ) : (
        <ul className="dashboard-posts">
          {userPosts.map((post) => {
            return (
              <li key={post.id} className="dashboard-post">
                  <Link to={`/post/${post.id}`} className="dashboard-post-title">{post.title}</Link>
                  <div className="dashboard-post-right">
                    <Link
                      to={`/edit/${post.id}`}
                      className="dashboard-btn edit"
                    >
                      Edit
                    </Link>
                    <span
                      className="dashboard-btn danger"
                      onClick={(e) => removePost(e,post.id)}
                    >
                      Delete
                    </span>
                  </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Dashboard;
