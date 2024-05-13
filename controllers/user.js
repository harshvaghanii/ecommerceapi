import { User } from "../models/User.js";
import { encryptPassword } from "./auth.js";

export const modifyUser = async (req, res) => {
	if (req.body.password) {
		req.body.password = encryptPassword(req.body.password);
	}
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json({
			success: true,
			updatedUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error,
		});
	}
};

export const deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res
			.status(201)
			.json({ success: true, message: "Your profile has been deleted!" });
	} catch (error) {
		res.status(500).json({
			success: false,
			error,
		});
	}
};
