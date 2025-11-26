import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import db from './src/config/database.js';
import User from './src/models/user.models.js';

const app = express();
app.use(express.json())

// Test Router - To create a user and see _id

app.post('/test', async (req, res) => {
    try {

        const email = "edison@1233454";

        let user= await User.findOne({email});

        if(user) {
            return res.json({
                success: true,
                message: "User already exist",
                userId: user._id,
                name:user.name
            })
        }

        user = await User.create({
            name: "Edison2",
            email: "edison@1233456",
            password: "12345"
        });

        console.log("Created User", user);
        console.log("User _id", user._id);
        console.log("_id type" , typeof user._id);
        console.log("_id as string", user._id.toString());

        res.json({
            success: true, 
            message: "User created",
            userId: user._id,
            User: user,
            name: user.name
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
    
})

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
