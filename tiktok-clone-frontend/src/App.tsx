import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Feed from './components/Feed';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  return (
<Router>
  <Routes>
    <Route path="/login" element={<AuthForm onAuth={(_, username) => setUser(username)} />} />
    <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login" />} />
    <Route path="*" element={<Navigate to="/login123" />} />
  </Routes>
</Router>
  );
};

export default App;