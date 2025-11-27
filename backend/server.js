import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import db from './src/config/database.js';
import User from './src/models/user.models.js';

const app = express();
app.use(express.json())

// Router
import userRoutes from './src/routes/userRoutes.js'
app.use('/api/', userRoutes);

const PORT = process.env.PORT ;

const connect = async () => {

    const response = await db();
    // if(!response) {
    //     console.log("Unable to connect to the mongoDB");
    // } 
    console.log(response)
    app.listen(PORT, () => {
    console.log(`The server is connected to the http://localhost:${PORT}`);
})
}

connect();
