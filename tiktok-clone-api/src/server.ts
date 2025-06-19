import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import sequelize from './config/database';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Jika mau sync semua model ke DB (optional)
    // await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start();
