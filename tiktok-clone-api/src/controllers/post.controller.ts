import { Request, Response } from 'express';
import * as postService from '../services/post.service';

export async function createPost(req: Request, res: Response) {
  const { content } = req.body;
  const userId = (req as any).user.id;

  try {
    const post = await postService.createPostService(userId, content);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post' });
  }
}

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await postService.getAllPostsService();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
}

export async function uploadVideoPost(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const { content } = req.body;
  const video = req.file;

  if (!video) {
    res.status(400).json({ message: 'Video file is required' });
    return;
  }

  try {
    const post = await postService.createPostService(userId, content, `/uploads/${video.filename}`);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload post' });
  }
}

export async function updatePost(req: Request, res: Response) {
  const { postId } = req.params;
  const userId = (req as any).user.id;
  const { content } = req.body;

  try {
    const updated = await postService.updatePostService(Number(postId), userId, content);
    if (!updated) {
      res.status(403).json({ message: 'Unauthorized or Post not found' });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Failed to update post' });
  }
}

export async function deletePost(req: Request, res: Response) {
  const { postId } = req.params;
  const userId = (req as any).user.id;

  try {
    const deleted = await postService.deletePostService(Number(postId), userId);
    if (!deleted) {
      res.status(403).json({ message: 'Unauthorized or Post not found' });
      return;
    }
    res.json({ message: 'Post deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete post' });
  }
}
