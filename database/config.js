const mongoose = require('mongoose');
const connection = async () => {
  try {
    mongoose.connect(process.env.DB_MON, {
      autoIndex: true,
      maxPoolSize: 10
    });
    console.log("Init DB...");
  } catch (error) {
    console.error(error);
    throw new Error("DB connection error...");
  }
}

module.exports = { connection }