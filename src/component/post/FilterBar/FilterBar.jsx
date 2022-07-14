import { useEffect, useState } from "react";
import { usePostContext } from "../../../context";
import { SelectField } from "../../ui";
import "./FilterBar.scss";

const Filterbar = () => {
  const {
    posts: [posts, postsDispatch],
  } = usePostContext();

  const [filterOptions, setFilterOptions] = useState({
    sortBy: "Latest",
    category: 0,
  });

  const handleSortOptions = (type) => {
    setFilterOptions({ ...filterOptions, sortBy: type });
  };

  const handleCategoryChange = (e) => {
    setFilterOptions({ ...filterOptions, category: e.target.value });
  };

  useEffect(() => {
    if (posts.allPosts.length > 0)
      postsDispatch({ type: "FILTER_POSTS", payload: filterOptions });
  }, [filterOptions]);

  return (
    <div className="filter-bar">
      <div className="filter-bar-left">
        <span
          className={`filter-bar-btn ${
            filterOptions.sortBy === "Latest" ? "active" : ""
          }`}
          onClick={() => handleSortOptions("Latest")}
        >
          Latest
        </span>
        <span
          className={`filter-bar-btn ${
            filterOptions.sortBy === "Top" ? "active" : ""
          }`}
          onClick={() => handleSortOptions("Top")}
        >
          Top
        </span>
      </div>
      <div className="filter-bar-right">
        <SelectField
          forFilter
          value={filterOptions.category}
          onChange={handleCategoryChange}
        />
      </div>
    </div>
  );
};

export default Filterbar;
