import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = '/api';

interface Comment {
  id: string;
  username: string;
  text: string;
}

interface Video {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  url: string;
  caption: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/videos/${id}`).then(res => res.json()).then(setVideo);
    fetch(`${API_BASE_URL}/videos/${id}/comments`).then(res => res.json()).then(setComments);
  }, [id]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API_BASE_URL}/videos/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: comment }),
    });
    setComment('');
    fetch(`${API_BASE_URL}/videos/${id}/comments`).then(res => res.json()).then(setComments);
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <video src={video.url} controls className="w-full rounded mb-2" style={{ maxHeight: 300 }} />
      <div className="font-bold">{video.caption}</div>
      <div>By: {video.username}</div>
      <hr className="my-4" />
      <form onSubmit={handleComment} className="mb-2 flex">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          placeholder="Add a comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">Post</button>
      </form>
      <div>
        {comments.map(c => (
          <div key={c.id} className="mb-2">
            <span className="font-semibold">{c.username}: </span>
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
