import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { InputField } from "../../ui";
import "./SearchBar.scss";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") return;
    navigate(`/search?title=${query}`);
  };

  return (
    <div className="search-bar">
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <InputField
          type="text"
          value={query}
          placeholder="Search..."
          onChange={handleQuery}
        />
        <FaSearch onClick={handleSubmit} className="search-bar-icon" />
      </form>
    </div>
  );
};

export default SearchBar;
