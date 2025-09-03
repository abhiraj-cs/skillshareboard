import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  // 'useParams' gets the dynamic part of the URL (the username)
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile/${username}`);
        setProfile(response.data);
      } catch (err) {
        setError('User not found.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]); // Re-run this effect if the username in the URL changes

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{profile.user.username}'s Profile</h2>
      <p><strong>Email:</strong> {profile.user.email}</p>
      <hr />
      <h3>Services Offered:</h3>
      {profile.services.length === 0 ? (
        <p>This user has not posted any services yet.</p>
      ) : (
        profile.services.map(service => (
          <div key={service._id} className="service-card">
            <h4>{service.title}</h4>
            <p>{service.description}</p>
            <p><strong>Price:</strong> ₹{service.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfilePage;
