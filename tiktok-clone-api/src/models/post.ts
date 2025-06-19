import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

interface PostAttributes {
  id: number;
  userId: number;
  content: string;
  videoUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'createdAt' | 'updatedAt' | 'videoUrl'> { }

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public userId!: number;
  public content!: string;
  public videoUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  },
  {
    sequelize,
    tableName: 'Posts',
    timestamps: true,
  }
);

// Relasi
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });

export default Post;
