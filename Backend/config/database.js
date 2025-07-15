import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected to the database, running at: ${conn.connection.host}`
    );
  } catch (err) {
    console.error("An error occured: ", err.message);
    process.exit(1);
  }
};

export default connectDB;
