import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { fetchUsers } from '../services/api';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id === 'new') {
      // If creating a new user, set loading to false directly
      setLoading(false);
    } else {
      // Fetch user data for editing
      fetchUsers()
        .then(response => {
          const user = response.data.find(user => user.id === parseInt(id));
          if (user) {
            setUser(user);
          } else {
            setError('User not found');
            navigate('/');
          }
        })
        .catch(() => setError('Failed to fetch user data'))
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  const handleSave = () => {
    navigate('/');
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {id === 'new' ? 'Create User' : 'Edit User'}
      </h1>
      <UserForm user={user} onSave={handleSave} />
    </div>
  );
};

export default UserPage;
