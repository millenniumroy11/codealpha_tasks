import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
  // Handle the input change and update the search query
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);  // Update the search query state
  };

  return (
    <input
      type="text"
      placeholder="Search for songs..."
      onChange={handleSearch}  // Call handleSearch on input change
    />
  );
};

export default SearchBar;
