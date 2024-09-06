import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers()
      .then(response => setUsers(response.data))
      .catch(() => setError('Failed to fetch users'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
        .then(() => setUsers(users.filter(user => user.id !== id)))
        .catch(() => setError('Failed to delete user'));
    }
  };

  if (loading) return <div className="text-center p-4 text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <ul className="list-none p-0">
      {users.map(user => (
        <li 
          key={user.id} 
          className="flex items-center justify-between bg-white p-4 mb-2 shadow rounded transform transition-transform duration-200 hover:scale-105"
        >
          <div className="flex-1">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
          <Link 
            to={`/user/${user.id}`}
            className="text-blue-500 hover:text-blue-600 underline mr-4 transition-colors duration-200"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(user.id)}
            aria-label={`Delete ${user.name}`}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
