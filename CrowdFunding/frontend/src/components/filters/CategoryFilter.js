import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="position-relative">
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
