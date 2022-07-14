import { useSearchParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { usePostContext } from "../../context";
import { PostItem } from "../../component/post/";
import "./Search.scss";

const Search = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  useDocumentTitle(`Search Results for ${title} - BLOGR`, title);

  const {
    posts: [posts],
  } = usePostContext();

  const searchResults = posts.allPosts.filter((post) =>
    post.title.toLowerCase().includes(title.toLowerCase())
  );

  return (
    <section className="search-results">
      <h1 className="search-results-title">Search Results:</h1>
      {searchResults.length > 0 && (
        <p className="search-results-count">
          {searchResults.length} result(s) found
        </p>
      )}

      {searchResults.length === 0 ? (
        <p className="no-results-text">No results matched your query !</p>
      ) : (
        <ul className="search-results-list">
          {searchResults.map((post, index) => {
            return <PostItem key={post.id} forSearch index={0} {...post} />;
          })}
        </ul>
      )}
    </section>
  );
};

export default Search;
