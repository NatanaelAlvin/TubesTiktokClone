import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Comment from './comment';

class LikeComment extends Model {
  public id!: number;
  public userId!: number;
  public commentId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LikeComment.init(
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
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'LikeComment',
    tableName: 'LikeComments',
  }
);

// Relasi
LikeComment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
LikeComment.belongsTo(Comment, { foreignKey: 'commentId', as: 'comment' });

User.hasMany(LikeComment, { foreignKey: 'userId', as: 'likedComments' });
Comment.hasMany(LikeComment, { foreignKey: 'commentId', as: 'likes' });

export default LikeComment;
