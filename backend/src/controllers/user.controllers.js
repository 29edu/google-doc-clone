import User from "../models/user.models.js";

const register = async (req, res) => {

    const {name, email , password} = req.body;

    try {
        const user = await User.findOne({email});
        if(user) {
            return res.status(409).json({
                success: false,
                message: "User already Exist",
            })
        }

        const newUser = await User.create({
            name,
            email,
            password
        })

        res.status(201).json({
            success: true,
            message: "Successfully Created the User",
            user: newUser
        })
    } catch (error) {
        console.log("Some error encountered in Register: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong in the register"
        })
    }
}

const login =  async ( req, res) => {

    try {
        const {name, email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User don't Exist"
            })
        }

        if(password !== user.password) {
            return res.status(400).json({
                success: false,
                message: "Wrong password"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully logged In",
            user: user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something is wrong in the login",
            error: error.message
        })
    }
}

const getUserProfile = () => {

}

export {
    register,
    login,
    getUserProfile
}