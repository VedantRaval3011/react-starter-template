import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const res = await axios.get(`/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
        navigate('/login'); // Redirect to login if error occurs
      }
    };

    fetchUserProfile();
  }, [id, navigate]);

  if (!user) return <div>Loading...</div>;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-4">Profile</h2>
      <div className="w-full max-w-md bg-white p-4 rounded shadow-md">
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Birthdate:</strong> {new Date(user.birthdate).toLocaleDateString()}</p>
        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
        <button
          className="w-full p-2 mt-4 bg-blue-500 text-white rounded"
          onClick={() => navigate('/game')}
        >
          Start Game
        </button>
      </div>
    </div>
  )
}

export default ProfilePage