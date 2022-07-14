import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostContext, useUserContext } from "../../../context";
import { addComment } from "../../../api/post";
import { Button } from "../../ui";
import "./CommentForm.scss";

const CommentForm = ({ postId, changeComments }) => {
  const [user] = useUserContext();
  const {
    posts: [, postsDispatch],
  } = usePostContext();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else if (comment === "") {
      return;
    } else {
      const createComment = async () => {
        try {
          const formData = new FormData();
          formData.append("user_id", user.id);
          formData.append("post_id", postId);
          formData.append("message", comment);
          const res = await addComment(formData);
          const data = await res.json();
          setComment("");
          changeComments(data);
          postsDispatch({ type: "ADD_COMMENT", payload: postId });
        } catch (err) {}
      };
      createComment();
    }
  };
  return (
    <form className="comments-form" onSubmit={handleSubmit}>
      <textarea
        className="comments-form-area"
        cols="10"
        rows="3"
        value={comment}
        placeholder="Add to the discussion..."
        onChange={handleComment}
      />
      <Button text="Submit" type="filled" onClick={handleSubmit} />
    </form>
  );
};

export default CommentForm;
