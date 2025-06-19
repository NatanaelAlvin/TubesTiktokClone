import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

class LikePost extends Model {
  public id!: number;
  public userId!: number;
  public postId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LikePost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'LikePost',
    tableName: 'LikePosts',
  }
);

// Relasi
LikePost.belongsTo(User, { foreignKey: 'userId', as: 'user' });
LikePost.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

User.hasMany(LikePost, { foreignKey: 'userId', as: 'likedPosts' });
Post.hasMany(LikePost, { foreignKey: 'postId', as: 'likes' });

export default LikePost;
