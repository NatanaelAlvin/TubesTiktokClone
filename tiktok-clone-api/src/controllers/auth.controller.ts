import { Request, Response } from 'express';
import User from '../models/user';
import { registerUser, loginUser } from '../services/auth.service';

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const user = await registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const login = await loginUser(email, password);
    res.status(200).json(login);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  try {
    const deleted = await User.destroy({
      where: { id: userId },
    });

    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully.' });
      return;
    }

    res.status(404).json({ message: 'User not found.' });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
    return;
  }
};

