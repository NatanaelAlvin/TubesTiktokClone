import { Request, Response } from 'express';
import * as searchService from '../services/search.service';

export async function searchUsers(req: Request, res: Response): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    res.status(400).json({ message: 'Query parameter is required' });
    return;
  }

  try {
    const users = await searchService.searchUsersService(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to search users' });
  }
}

export async function searchPosts(req: Request, res: Response): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    res.status(400).json({ message: 'Query parameter is required' });
    return;
  }

  try {
    const posts = await searchService.searchPostsService(query);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to search posts' });
  }
}
