// src/app.ts
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import followRoutes from './routes/follow.routes';
import likeRoutes from './routes/like.routes'
import searchRoutes from './routes/search.routes';
import profileRoutes from './routes/profile.routes';




const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/likes', likeRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/search', searchRoutes);
app.use('/api/profile', profileRoutes);


export default app;
