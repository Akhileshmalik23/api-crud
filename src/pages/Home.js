import React from 'react';
import UserList from '../components/UserList';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">User Management</h1>
      <Link to="/user/new">
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">
          Create New User
        </button>
      </Link>
      <div className="mt-6">
        <UserList />
      </div>
    </div>
  );
};

export default Home;
