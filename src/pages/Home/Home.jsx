import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useUserContext } from "../../context";
import { Button } from "../../component/ui";
import { FilterBar,PostList } from "../../component/post";
import "./Home.scss";

const Home = () => {

  useDocumentTitle("BLOGR");
  const [user]=useUserContext();

  return (
    <section className="home">
      <div className="home-container">
        <div className="home-aside">
          <p className="home-aside-text">
            <span className="home-aside-brand">BLOGR </span>
            is a place where coders share,stay up-to-date and grow their careers.
          </p>
          <div className="home-aside-btns">
            {user?
            <Button text="Create Post" type="filled"to="/create-post"/>
            :
            <>
            <Button text="Create account" type="filled" to="/register" />
            <Button text="Log in" type="ghost" to="/login" />
            </>
            }
          </div>
        </div>
        <div className="home-main">
          <FilterBar/>
          <PostList/>
        </div>
      </div>
    </section>
  )
}

export default Home;