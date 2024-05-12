import { User } from "../models/User.js";
import CryptoJS from "crypto-js";

export const register = async (req, res) => {
	const { username, email, password } = req.body;

	const newUser = new User({
		username,
		email,
		password: encryptPassword(password),
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.errorResponse.errmsg,
			error,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { username, password: userPassword } = req.body;
		const user = await User.findOne({ username });
		const decryptedPassword = decryptPassword(user.password);
		if (userPassword !== decryptedPassword) {
			return res.json({
				success: false,
				message: "Wrong credentials!",
			});
		}
		const { password, ...otherInformation } = user._doc;
		res.json(otherInformation);
	} catch (error) {
		res.status(400).json({
			success: false,
			error,
		});
	}
};

const encryptPassword = (password) => {
	var encryptedPassword = CryptoJS.AES.encrypt(
		password,
		process.env.SECRET_PASSPHRASE
	);
	return encryptedPassword.toString();
};

const decryptPassword = (encryptedPassword) => {
	var password = CryptoJS.AES.decrypt(
		encryptedPassword,
		process.env.SECRET_PASSPHRASE
	);
	return password.toString(CryptoJS.enc.Utf8);
};
