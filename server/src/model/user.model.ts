import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be atleast 6 characters long"]
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", userSchema)
export default User
