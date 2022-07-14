import useDocumentTitle from "../../hooks/useDocumentTitle";
import { PostForm } from "../../component/post";

const CreatePost = () => {
  useDocumentTitle("New Post - BLOGR");
  return <PostForm />;
};

export default CreatePost;
