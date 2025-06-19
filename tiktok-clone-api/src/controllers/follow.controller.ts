import { Request, Response } from 'express';
import * as followService from '../services/follow.service';

export async function followUser(req: Request, res: Response): Promise<void> {
  const followerId = (req as any).user.id;
  const { followingId } = req.body;

  if (followerId === Number(followingId)) {
    res.status(400).json({ message: 'You cannot follow yourself' });
    return;
  }

  try {
    const follow = await followService.followUserService(followerId, followingId);
    res.status(201).json(follow);
  } catch (err) {
    res.status(500).json({ message: 'Failed to follow user' });
  }
}

export async function getFollowers(req: Request, res: Response) {
  const userId = parseInt(req.params.userId);

  try {
    const followers = await followService.getFollowersService(userId);
    res.status(200).json(followers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get followers' });
  }
}

export async function getFollowing(req: Request, res: Response) {
  const userId = parseInt(req.params.userId);

  try {
    const following = await followService.getFollowingService(userId);
    res.status(200).json(following);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get following' });
  }
}
