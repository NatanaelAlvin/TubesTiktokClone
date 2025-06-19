import Post from '../models/post';
import User from '../models/user';

export async function createPostService(userId: number, content: string, videoUrl?: string) {
  const post = await Post.create({ userId, content, videoUrl });
  return post;
}

export async function getAllPostsService() {
  const posts = await Post.findAll({ include: [{ model: User, as: 'user',attributes: ['username']}] });
  return posts;
}

export async function updatePostService(postId: number, userId: number, content: string) {
  const post = await Post.findByPk(postId);
  if (!post || post.userId !== userId) return null;
  post.content = content;
  await post.save();
  return post;
}

export async function deletePostService(postId: number, userId: number) {
  const post = await Post.findByPk(postId);
  if (!post || post.userId !== userId) return false;
  await post.destroy();
  return true;
}
