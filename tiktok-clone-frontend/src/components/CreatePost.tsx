import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = '/api';

const CreatePost: React.FC = () => {
  const [caption, setCaption] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, url: videoUrl }),
      });
      if (!res.ok) throw new Error('Failed to create post');
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Post</h2>
      {error && <div className="mb-3 text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Video URL"
          className="w-full mb-3 p-2 border rounded"
          value={videoUrl}
          onChange={e => setVideoUrl(e.target.value)}
          required
        />
        <textarea
          placeholder="Caption"
          className="w-full mb-3 p-2 border rounded"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
