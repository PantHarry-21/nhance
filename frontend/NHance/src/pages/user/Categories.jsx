import React from "react";

const Categories = () => {
  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-4">All Categories</h2>

      <div className="row">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="col-6 col-md-3 mb-3">
            <div className="card p-3 text-center shadow-sm">
              Category {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
