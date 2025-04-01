import React from "react";

const Categories = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-purple-700 mb-4">All Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white shadow p-4 rounded text-center">
            Category {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
