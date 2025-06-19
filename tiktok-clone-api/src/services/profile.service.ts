import User from '../models/user';
import Post from '../models/post';

export async function getUserProfileService(userId: number) {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'username', 'email', 'bio', 'createdAt']
  });

  if (!user) return null;

  const posts = await Post.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'content', 'videoUrl', 'createdAt']
  });

  return { user, posts };
}
export async function updateUserProfileService(userId: number, updates: Partial<User>) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  user.username = updates.username ?? user.username;
  user.email = updates.email ?? user.email;
  user.bio = updates.bio ?? user.bio;

  await user.save();

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    bio: user.bio,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}
