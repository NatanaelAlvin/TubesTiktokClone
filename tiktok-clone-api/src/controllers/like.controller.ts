import { Request, Response } from 'express';
import * as likeService from '../services/like.service';

export async function likePost(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const { postId } = req.body;

  try {
    const like = await likeService.likePostService(userId, postId);
    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ message: 'Failed to like post' });
  }
}

export async function likeComment(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const { commentId } = req.body;

  try {
    const like = await likeService.likeCommentService(userId, commentId);
    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ message: 'Failed to like comment' });
  }
}
