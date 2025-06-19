import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile: React.FC = () => {
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => setIsFollowing(true);
  const handleUnfollow = () => setIsFollowing(false);

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2">Profil: {username}</h2>
      <button
        className={`px-4 py-2 rounded ${isFollowing ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
        onClick={isFollowing ? handleUnfollow : handleFollow}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
      {/* Tampilkan info user, daftar post, dsb */}
    </div>
  );
};

export default Profile;