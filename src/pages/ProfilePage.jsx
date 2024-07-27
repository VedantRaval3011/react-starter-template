import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
    };

    fetchUserProfile();
  }, [id, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-pink-50 to-purple-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg mt-16">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-center">
          Welcome, {user.firstName}!
        </h2>
        <p className="text-center mb-4 text-gray-700">
          Logged in as <span className="font-medium">{user.email}</span>
        </p>
        
        <button
          className="w-full py-3 mt-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-md hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm text-center"
          onClick={() => navigate("/game")}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
