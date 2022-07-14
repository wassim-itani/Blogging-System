import { Link } from "react-router-dom";
import { FaHeart,FaComment } from "react-icons/fa";
import "./PostItem.scss";


const PostItem = ({...post}) => {
  return (
    // <li>
    <Link to={`/post/${post.id}`} className="post-link">
      {post.index === 0 && post.image ? (
        <img src={post.image} alt={post.title} className="post-link-img" />
      ) : null}
      <div className="post-link-body">
        <img
          src={post.user.image}
          alt={post.user.username}
          className="post-link-profile" 
        />
        <div className="post-link-info">
          <div>
            <p className="post-link-text">{post.user.username}</p>
            <p className="post-link-text">Posted on: {post.posted_at}</p>
          </div>
          <div className="post-link-title">{post.title}</div>
          <div className="post-link-text">#{post.category.name.toLowerCase()}</div>
          <div className="post-link-stats">
            <span className="post-link-stat">
              <FaHeart fill="#dc3545" /> {post.likes.length} Likes
            </span>
            <span className="post-link-stat">
              <FaComment fillOpacity={0.85}/> {post.comments} Comments
            </span>
          </div>
        </div>
      </div>
    </Link>
    // </li>
  );
};

export default PostItem;
