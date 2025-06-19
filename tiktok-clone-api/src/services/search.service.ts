import User from '../models/user';
import Post from '../models/post';
import { Op } from 'sequelize';

export async function searchUsersService(query: string) {
  return await User.findAll({
    where: {
      username: {
        [Op.iLike]: `%${query}%`
      }
    }
  });
}

export async function searchPostsService(query: string) {
  return await Post.findAll({
    where: {
      content: {
        [Op.iLike]: `%${query}%`
      }
    }
  });
}
