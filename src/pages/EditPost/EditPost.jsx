import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostForm } from "../../component/post";
import { getSinglePost } from "../../api/post";
import { useUserContext } from "../../context";
import { Loader } from "../../component/ui";
import { convertFromRaw } from "draft-js";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const EditPost = () => {
  useDocumentTitle("Edit Post - BLOGR");
  const { postId } = useParams();
  const [user] = useUserContext();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await getSinglePost(postId);
        if (!res.ok) {
          throw new Error(res.status);
        }
        const data = await res.json();
        if (data.user.username !== user.username) {
          throw new Error("404");
        }
        setPost(data);
      } catch (err) {
        if (err.message === "404") {
          navigate("/not-found");
        }
      }
    };
    getPost();
  }, []);

  return (
    <>
      {!post ? (
        <Loader />
      ) : (
        <PostForm
          editDetails={{
            id:postId,
            category: post.category.id,
            image: post.image,
            title: post.title,
            content: convertFromRaw(JSON.parse(post.content)),
          }}
        />
      )}
    </>
  );
};

export default EditPost;
