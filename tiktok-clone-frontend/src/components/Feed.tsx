import React, { useState } from 'react';

const Feed: React.FC = () => {
  const [tab, setTab] = useState<'friends' | 'following' | 'fyp'>('fyp');

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-center mb-6 gap-4">
        <button
          className={`px-4 py-2 rounded ${tab === 'friends' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('friends')}
        >
          Friends
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'following' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('following')}
        >
          Following
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'fyp' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('fyp')}
        >
          FYP
        </button>
      </div>
      <div className="bg-white rounded shadow p-6 min-h-[200px]">
        {tab === 'friends' && <div>Daftar Task dari Friends</div>}
        {tab === 'following' && <div>Daftar Task dari Following</div>}
        {tab === 'fyp' && <div>Daftar Task FYP (For You Page)</div>}
      </div>
    </div>
  );
};

export default Feed;