import { DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';
import User from './user';

interface FollowAttributes {
  id: number;
  followerId: number;
  followingId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FollowCreationAttributes extends Optional<FollowAttributes, 'id'> {}

class Follow extends Model<FollowAttributes, FollowCreationAttributes> implements FollowAttributes {
  public id!: number;
  public followerId!: number;
  public followingId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    followerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    followingId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Follows',
    timestamps: true,
  }
);

// Relasi (alias)
Follow.belongsTo(User, { foreignKey: 'followerId', as: 'Follower' });
Follow.belongsTo(User, { foreignKey: 'followingId', as: 'Following' });

User.hasMany(Follow, { foreignKey: 'followerId', as: 'Followings' });
User.hasMany(Follow, { foreignKey: 'followingId', as: 'Followers' });

export default Follow;
