import mongoose from "mongoose";
import dotenv from "dotenv";

<<<<<<< HEAD
dotenv.config({
    path: ".env",
});

const DB_URL = process.env.DB_URL;

const connectDb = async () => {
    try {
        
        await mongoose.connect(DB_URL)
          .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));
    } catch (error) {
        console.log('moongooDb error',error)
    }

}

export default connectDb
=======
dotenv.config({ path: ".env" });

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("DB_URL is missing in environment variables");
}

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

export default connectDb;
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
