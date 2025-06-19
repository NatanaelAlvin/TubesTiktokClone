import { Request, Response } from 'express';
import * as profileService from '../services/profile.service';

export async function getUserProfile(req: Request, res: Response): Promise<void> {
  const userId = parseInt(req.params.userId);

  try {
    const data = await profileService.getUserProfileService(userId);
    if (!data) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
}
export async function editUserProfile(req: Request, res: Response): Promise<void> {
  const userId = (req as any).user.id;
  const { username, email, bio } = req.body;

  try {
    const updatedUser = await profileService.updateUserProfileService(userId, { username, email, bio });
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
}

