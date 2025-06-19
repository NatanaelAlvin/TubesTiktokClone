import { Request, Response } from 'express';
import * as commentService from '../services/comment.service';

export async function createComment(req: Request, res: Response) {
  const { content, postId, parentId } = req.body;
  const userId = (req as any).user.id;

  try {
    const comment = await commentService.createCommentService({ content, postId, parentId, userId });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create comment' });
  }
}

export async function getPostComments(req: Request, res: Response) {
  const { postId } = req.params;

  try {
    const comments = await commentService.getPostCommentsService(Number(postId));
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
}
