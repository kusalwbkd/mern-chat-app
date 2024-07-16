import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			
		},
        email: {
			type: String,
			
		},
		username: {
			type: String,
			
		},
		password: {
			type: String,
			
		},
		gender: {
			type: String,
		
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;