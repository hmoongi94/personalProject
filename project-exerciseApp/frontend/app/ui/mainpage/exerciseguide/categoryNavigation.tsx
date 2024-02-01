import React from "react";

interface CategoryNavigationProps {
  categories: string[];
  selectedCategory: string | null;
  filterExercisesByCategory: (category: string | null) => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  selectedCategory,
  filterExercisesByCategory,
}) => {
  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => filterExercisesByCategory(null)}
        className={`mx-2 px-4 py-2 rounded ${
          selectedCategory === null ? "bg-pink-500" : "bg-pink-300"
        }`}
      >
        전체
      </button>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => filterExercisesByCategory(category)}
          className={`mx-2 px-4 py-2 rounded ${
            selectedCategory === category ? "bg-pink-500" : "bg-pink-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryNavigation;