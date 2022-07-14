import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditorState } from "draft-js";
import { TextEditor } from "..";
import { convertToRaw } from "draft-js";
import { useUserContext, usePostContext } from "../../../context";
import { createPost, editPost } from "../../../api/post";
import { Button, InputField, Notification, SelectField } from "../../ui";
import "./PostForm.scss";

const PostForm = ({ editDetails }) => {
  const [user] = useUserContext();
  const {
    posts: [, postsDispatch],
  } = usePostContext();

  const navigate = useNavigate();

  const [postData, setPostData] = useState(() => {
    return !editDetails
      ? {
          category: 1,
          image: null,
          title: "",
          content: EditorState.createEmpty(),
        }
      : {
          postId: editDetails.id,
          category: editDetails.category,
          image: null,
          title: editDetails.title,
          content: EditorState.createWithContent(editDetails.content),
        };
  });

  const [status, setStatus] = useState({
    error: "",
    loading: false,
  });

  const handleInputChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setPostData({ ...postData, [e.target.name]: value });
  };

  const handleEditorChange = (newState) => {
    setPostData({ ...postData, content: newState });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !postData.title ||
      !postData.category ||
      !postData.content.getCurrentContent().hasText()
    ) {
      setStatus({ ...status, error: "Please fill all fields" });
      return;
    }

    const body = {
      id: user.id,
      ...postData,
      content: JSON.stringify(
        convertToRaw(postData.content.getCurrentContent())
      ),
    };

    const formData = new FormData();
    for (const key in body) {
      formData.append(key, body[key]);
    }

    const action = async () => {
      try {
        setStatus({ ...status, error: "", loading: true });
        let res;

        if (!editDetails) {
          res = await createPost(formData);
        } else {
          res = await editPost(formData);
        }

        const data = await res.json();
        setStatus({ ...status, loading: false });
        if (!res.ok) {
          throw new Error(data);
        }

        if (!editDetails) {
          postsDispatch({ type: "ADD_POST", payload: data });
        } else {
          postsDispatch({ type: "EDIT_POST", payload: data });
        }
        navigate("/dashboard");
      } catch (err) {
        if (err.name === "TypeError") {
          err.message = "Network Error";
        }
        setStatus({ ...status, error: err.message });
      }
    };
    action();
  };

  return (
    <section className="post">
      {status.loading && (
        <Notification
          type="success"
          message={editDetails ? "Editing post..." : "Creating post..."}
        />
      )}
      {status.error && <Notification type="error" message={status.error} />}
      <h1 className="post-title">{!editDetails ? "Create" : "Edit"} Post</h1>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="post-form-block">
          <InputField
            id="image"
            label="Image"
            type="file"
            name="image"
            onChange={handleInputChange}
          />
          {editDetails && editDetails.image && !postData.image && (
            <p className="post-prev-img">
              (
              <a
                href={editDetails.image}
                target="_blank"
                className="post-prev-img-link"
              >
                previous image
              </a>{" "}
              is used)
            </p>
          )}
        </div>
        <div className="post-form-block">
          <InputField
            id="title"
            label="Title"
            type="text"
            name="title"
            value={postData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="post-form-block">
          <SelectField value={postData.category} onChange={handleInputChange} />
        </div>
        <div className="post-form-block">
          <label>Content:</label>
          <TextEditor
            editorState={postData.content}
            handleEditorChange={handleEditorChange}
          />
        </div>
        <Button
          text="Publish"
          type="filled"
          disabled={status.loading}
          onClick={handleSubmit}
        />
      </form>
    </section>
  );
};

export default PostForm;
