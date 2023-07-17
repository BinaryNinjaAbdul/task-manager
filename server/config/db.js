const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASS);

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(DB);
        console.log(`DB Connected ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;