import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = '/api';

interface User {
  id: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

interface UserProfileProps {
  currentUser: string;
}

const UserProfile: React.FC<UserProfileProps> = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/users/${id}`).then(res => res.json()).then(setUser);
  }, [id]);

  const handleFollow = async () => {
    await fetch(`${API_BASE_URL}/users/${id}/follow`, { method: 'POST' });
    setUser(user => user ? { ...user, isFollowing: true } : user);
  };

  const handleUnfollow = async () => {
    await fetch(`${API_BASE_URL}/users/${id}/unfollow`, { method: 'POST' });
    setUser(user => user ? { ...user, isFollowing: false } : user);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={user.avatar} alt="" className="w-20 h-20 rounded-full mx-auto mb-2" />
      <div className="text-center font-bold text-xl">{user.username}</div>
      <div className="text-center mb-4">ID: {user.id}</div>
      {user.isFollowing ? (
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleFollow}>Follow</button>
      )}
    </div>
  );
};

export default UserProfile;
