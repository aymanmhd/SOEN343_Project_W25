import React from "react";
import "../styles/SearchInput.css";

function SearchInput({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
