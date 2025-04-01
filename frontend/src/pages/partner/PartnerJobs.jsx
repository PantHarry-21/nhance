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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Assigned Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-semibold mb-2">{job.service_id}</h3>
          <p><strong>Status:</strong> {job.status}</p>
          <div className="space-x-2 mt-2">
            <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => updateStatus(job.id, "on-the-way")}>On The Way</button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => updateStatus(job.id, "started")}>Started</button>
            <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => updateStatus(job.id, "completed")}>Completed</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartnerJobs;
