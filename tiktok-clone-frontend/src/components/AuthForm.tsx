import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  onAuth: (token: string, username: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuth }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Tambah state sukses
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const url = isSignup ? '/api/auth/register' : '/api/auth/login';
      const body = isSignup ? { username, email, password } : { username, password };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      let data = {};
      if (text) {
        data = JSON.parse(text);
      }
      if (!res.ok) throw new Error((data as any).message || 'Auth failed');
      setSuccess(isSignup ? 'Registrasi berhasil! Silakan login.' : 'Login berhasil!');
      if (!isSignup) {
        navigate('/feed');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">
          {isSignup ? 'Sign Up' : 'Sign In to Tiktok'}
        </h2>
        {error && <div className="mb-4 text-red-500 text-center w-full">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center w-full">{success}</div>}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-4 text-lg border rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        {isSignup && (
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-4 text-lg border rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-4 text-lg border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 text-lg rounded hover:bg-blue-600 mb-3"
        >
          {isSignup ? 'Sign Up' : 'Sign In'}
        </button>
        <button
          type="button"
          className="w-full text-blue-500 underline text-base"
          onClick={() => { setIsSignup(!isSignup); setError(null); setSuccess(null); }}
        >
          {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;