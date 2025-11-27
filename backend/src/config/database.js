import mongoose from "mongoose";
import 'dotenv/config'

const db = async () => {
    try {

        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Successfully connected to the mongoDB");
        console.log("Connection: ", typeof connection);
        return true;
    } catch (error) {
        console.log("failed to connect to the mongoDB: ", error)
    }
}

export default db;