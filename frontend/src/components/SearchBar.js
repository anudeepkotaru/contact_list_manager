import React, { useState } from "react";
import "../styles/App.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
