import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import { usePostContext, useUserContext } from "../../context";
import { getSinglePost, likePost, unlikePost } from "../../api/post";
import { CommentForm } from "../../component/post";
import { FaHeart } from "react-icons/fa";
import { Loader } from "../../component/ui";
import "./SinglePost.scss";

const SinglePost = () => {
  const { id } = useParams();
  const [user] = useUserContext();
  const {
    posts: [, postsDispatch],
  } = usePostContext();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState({ error: false, loading: true });
  const navigate = useNavigate();
  let liked = false;

  if (post && user) {
    liked = post.likes.some((username) => username === user.username);
  }

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await getSinglePost(id);
        if (!res.ok) {
          throw new Error(res.status);
        }
        const data = await res.json();
        setPost(data);
        document.title = data.title + " - BLOGR";
        setStatus({ error: false, loading: false });
      } catch (err) {
        if (err.message === "404") {
          navigate("/not-found");
        } else {
          if (err.name === "TypeError") err.message = "Network Error";
          setStatus({ error: err.message, loading: false });
        }
      }
    };
    getPost();
  }, []);

  const toggleLike = async () => {
    if (!user) {
      navigate("/login");
    } else {
      const formData=new FormData();
      formData.append('user_id',user.id);
      formData.append('post_id',post.id);
      try {
        if (liked) {
          await unlikePost(formData);
          setPost({
            ...post,
            likes: [
              ...post.likes.filter((username) => username !== user.username),
            ],
          });
          postsDispatch({
            type: "UNLIKE_POST",
            payload: { username: user.username, postId: post.id },
          });
        } else {
          await likePost(formData);
          setPost({ ...post, likes: [...post.likes, user.username] });
          postsDispatch({
            type: "LIKE_POST",
            payload: { username: user.username, postId: post.id },
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const newComment = (comment) => {
    setPost({ ...post, comments: [...post.comments, comment] });
  };

  return (
    <>
      {status.loading ? (
        <Loader />
      ) : status.error ? (
        <p className="single-post-error">{status.error}</p>
      ) : (
        <div className="single-post">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="single-post-img"
            />
          )}
          <div className="single-post-body">
            <div className="single-post-intro">
              <div className="single-post-left">
                <img
                  src={post.user.image}
                  alt={post.user.username}
                  className="single-post-profile"
                />
                <div className="single-post-info">
                  <span className="single-post-username">
                    {post.user.username}
                  </span>
                  <span className="single-post-date">
                    Posted on: {post.posted_at}
                  </span>
                </div>
              </div>
              <div className="single-post-like">
                <FaHeart
                  onClick={toggleLike}
                  className="single-post-like-icon"
                  fill={liked ? "#dc3545" : "#ffffff"}
                />
                &nbsp; {post.likes.length} Likes
              </div>
            </div>
            <h1 className="single-post-title">{post.title}</h1>
            <span className="single-post-category">
              #{post.category.name.toLowerCase()}
            </span>
            <div
              className="single-post-content"
              dangerouslySetInnerHTML={{
                __html: convertToHTML(convertFromRaw(JSON.parse(post.content))),
              }}
            />
          </div>
          <div className="single-post-comments">
            <h2 className="single-post-comments-title">
              Comments ({post.comments.length}){" "}
            </h2>
            <CommentForm
              postId={post.id}
              changeComments={(comment) => newComment(comment)}
            />
            {post.comments.length > 0 ? (
              <ul className="single-post-comments-list">
                {post.comments.map((comment, index) => {
                  return (
                    <li key={index} className="single-post-comments-item">
                      <p className="single-post-comments-top">
                        <span className="single-post-comments-username">
                          {comment.username}
                        </span>
                        <span className="single-post-comments-date">
                          {" "}
                          on {comment.created_at}
                        </span>
                      </p>
                      <p className="single-post-comments-message">
                        {comment.message}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="single-post-no-comments">
                Be the first person to comment on this post !
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePost;
