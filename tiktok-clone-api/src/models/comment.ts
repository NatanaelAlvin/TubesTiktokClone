import { DataTypes, INTEGER, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

interface CommentAttributes {
  id: number;
  userId: number;
  postId: number;
  content: string;
  parentId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id' | 'createdAt' | 'updatedAt' | 'parentId'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public userId!: number;
  public postId!: number;
  public content!: string;
  public parentId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Comments',
    timestamps: true,
  }
);

// Relasi
Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

Comment.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comment, { foreignKey: 'postId' });

Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parentId' });
Comment.belongsTo(Comment, { as: 'parent', foreignKey: 'parentId' });


export default Comment;
