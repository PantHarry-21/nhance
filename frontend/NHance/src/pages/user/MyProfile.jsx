import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/api";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();

      if (res.error) {
        toast.error("Failed to fetch profile");
      } else {
        setProfile(res.user);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-5">Loading profile...</div>;

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4 text-primary">My Profile</h3>
      <div className="card p-4 shadow-sm">
        <p><strong>Full Name:</strong> {profile?.user_metadata?.full_name || "N/A"}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Membership:</strong> Premium</p>
        <p><strong>Joined:</strong> {new Date(profile?.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MyProfile;
