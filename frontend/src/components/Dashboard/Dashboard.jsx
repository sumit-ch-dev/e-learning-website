import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";


const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from wherever it's stored (e.g., localStorage, sessionStorage)
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the token to get user information
        const decodedToken = decodeToken(token);

        // Check if the decodedToken has the expected structure
        if (decodedToken && decodedToken.user && decodedToken.user.role) {
          const userRole = decodedToken.user.role;
          console.log(userRole)

          // Redirect the user based on their role
          switch (userRole) {
            case 'Student':
              navigate('/student-dashboard');
              break;
            case 'Instructor':
              navigate('/instructor-dashboard');
              break;
            case 'Admin':
              navigate('/admin-dashboard');
              break;
            default:
              // Handle unexpected roles or redirect to a default dashboard
              navigate('/default-dashboard');
          }
        }
      } catch (error) {
        // Handle decoding errors
        console.error('Error decoding token:', error);
        navigate('/login'); // Redirect to login page if decoding fails
      }
    } else {
      // Redirect to login if there is no token
      navigate('/login');
    }
  }, [navigate]);

  return (
    // Your dashboard component JSX
    <div>
      <h1>Dashboard</h1>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
