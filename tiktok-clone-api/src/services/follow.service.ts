import Follow from '../models/follow';
import User from '../models/user';

export async function followUserService(followerId: number, followingId: number) {
  return await Follow.create({ followerId, followingId });
}

export async function getFollowersService(userId: number) {
  return await User.findAll({
    include: {
      model: Follow,
      where: { followingId: userId },
      attributes: [],
    },
  });
}

export async function getFollowingService(userId: number) {
  return await User.findAll({
    include: {
      model: Follow,
      where: { followerId: userId },
      attributes: [],
    },
  });
}
