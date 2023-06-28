const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

       

const connectDB = async () => {
  try {   
    //const conn = await mongoose.createConnection( process.env.MONGO_URI)   
    const conn = await mongoose.connect( "mongodb+srv://Art:cerepovetc1@cluster0.kkhvsfy.mongodb.net/?retryWrites=true&w=majority/")

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)

  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
