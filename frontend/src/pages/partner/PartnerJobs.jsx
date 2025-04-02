import React, { useEffect, useState } from "react";
import axios from "axios";

const PartnerJobs = () => {
  const email = localStorage.getItem("email");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/partner/jobs/${email}`);
        setJobs(res.data.jobs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, [email]);

  const updateStatus = async (id, status) => {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/status`, { id, status });
    alert("Status updated!");
  };

  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-4">Assigned Jobs</h2>

      {jobs.map((job) => (
        <div key={job.id} className="card p-3 mb-4 shadow-sm">
          <h5>{job.service_id}</h5>
          <p><strong>Status:</strong> {job.status}</p>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-outline-primary btn-sm" onClick={() => updateStatus(job.id, "on the way")}>
              On the Way
            </button>
            <button className="btn btn-outline-success btn-sm" onClick={() => updateStatus(job.id, "started")}>
              Started
            </button>
            <button className="btn btn-outline-dark btn-sm" onClick={() => updateStatus(job.id, "completed")}>
              Completed
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartnerJobs;
