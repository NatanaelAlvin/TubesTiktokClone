import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'tiktok_clone',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'alvin521',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
