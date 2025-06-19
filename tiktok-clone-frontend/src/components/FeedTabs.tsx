import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = '/api';

interface User {
  id: string;
  username: string;
  avatar: string;
}

interface Video {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  url: string;
  caption: string;
}

const FeedTabs: React.FC = () => {
  const [tab, setTab] = useState<'friends' | 'following' | 'fyp'>('fyp');
  const [friends, setFriends] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [fyp, setFyp] = useState<Video[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (tab === 'friends') {
      fetch(`${API_BASE_URL}/friends`).then(res => res.json()).then(setFriends);
    } else if (tab === 'following') {
      fetch(`${API_BASE_URL}/following`).then(res => res.json()).then(setFollowing);
    } else if (tab === 'fyp') {
      fetch(`${API_BASE_URL}/fyp`).then(res => res.json()).then(setFyp);
    }
  }, [tab]);

  return (
    <div className="mb-6">
      <div className="flex gap-4 mb-4">
        <button className={tab === 'friends' ? 'font-bold' : ''} onClick={() => setTab('friends')}>Friends</button>
        <button className={tab === 'following' ? 'font-bold' : ''} onClick={() => setTab('following')}>Following</button>
        <button className={tab === 'fyp' ? 'font-bold' : ''} onClick={() => setTab('fyp')}>FYP</button>
        <button className="ml-auto bg-green-500 text-white px-3 py-1 rounded" onClick={() => navigate('/create')}>+ Create</button>
      </div>
      {tab === 'friends' && (
        <ul>
          {friends.map(friend => (
            <li key={friend.id} className="flex items-center mb-2 cursor-pointer" onClick={() => navigate(`/profile/${friend.id}`)}>
              <img src={friend.avatar} alt="" className="w-8 h-8 rounded-full mr-2" />
              {friend.username}
            </li>
          ))}
        </ul>
      )}
      {tab === 'following' && (
        <ul>
          {following.map(user => (
            <li key={user.id} className="flex items-center mb-2 cursor-pointer" onClick={() => navigate(`/profile/${user.id}`)}>
              <img src={user.avatar} alt="" className="w-8 h-8 rounded-full mr-2" />
              {user.username}
            </li>
          ))}
        </ul>
      )}
      {tab === 'fyp' && (
        <ul>
          {fyp.map(video => (
            <li key={video.id} className="mb-4 cursor-pointer" onClick={() => navigate(`/post/${video.id}`)}>
              <video src={video.url} controls className="w-full rounded" style={{ maxHeight: 200 }} />
              <div>{video.caption}</div>
              <div>By: {video.username}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedTabs;
