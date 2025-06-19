import bcrypt from 'bcrypt';
import User from '../models/user';
import { generateToken } from '../utils/jwt';

export async function registerUser(username: string, email: string, password: string) {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    passwordHash: hashedPassword,
  });
  return {
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
}

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = generateToken({ id: user.id, email: user.email });

  return {
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
};
