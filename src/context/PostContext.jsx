import {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";
import postReducer from "../reducer/post";
import { getPosts } from "../api/post";

const postContext = createContext();
export const usePostContext = () => useContext(postContext);

const PostContext = ({ children }) => {
  const [posts, postsDispatch] = useReducer(postReducer, {
    allPosts: [],
    filteredPosts: [],
  });
  
  const [postsStatus, setPostsStatus] = useState({ error: "", loading: false});
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPostsStatus({ ...postsStatus, loading: true });
        const res = await getPosts();
        setPostsStatus({ ...postsStatus, loading: false });
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        postsDispatch({ type: "ADD_FETCHED_POSTS", payload: data });
      } catch (err) {
        if(err.name === 'TypeError'){
          err.message="Network Error"
        }
        setPostsStatus({ error: err.message, loading: false });
      }
    };
    fetchPosts();
  }, []);
  return (
    <postContext.Provider
      value={{ posts: [posts, postsDispatch], postsStatus }}
    >
      {children}
    </postContext.Provider>
  );
};

export default PostContext;
