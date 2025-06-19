import LikePost from '../models/likepost';
import LikeComment from '../models/likecomment';

export async function likePostService(userId: number, postId: number) {
  return await LikePost.create({ userId, postId });
}

export async function likeCommentService(userId: number, commentId: number) {
  return await LikeComment.create({ userId, commentId });
}
