import React from "react";

const Services = () => {
  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-4">Manage Services</h2>

      <button className="btn btn-primary mb-4">Add Service</button>

      <div className="row">
        {[1, 2, 3].map((item) => (
          <div key={item} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <h5>Service {item}</h5>
              <p>Description for service {item}</p>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-warning">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
