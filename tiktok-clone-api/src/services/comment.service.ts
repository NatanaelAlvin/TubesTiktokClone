import Comment from '../models/comment';
import User from '../models/user';

interface CreateCommentInput {
  content: string;
  postId: number;
  userId: number;
  parentId?: number | null;
}

export async function createCommentService({
  content,
  postId,
  userId,
  parentId = null
}: CreateCommentInput) {
  return await Comment.create({
    content,
    postId,
    userId,
    parentId
  });
}

export async function getPostCommentsService(postId: number) {
  return await Comment.findAll({
    where: { postId, parentId: null },
    include: [
      {
        model: Comment,
        as: 'replies',
        include: [{ model: User, attributes: ['id', 'username'] }]
      },
      { model: User, attributes: ['id', 'username'] }
    ]
  });
}
