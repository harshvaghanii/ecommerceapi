import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SEC, (err, user) => {
			if (err)
				res.status(403).json({ success: false, message: "Token is invalid!" });
			req.user = user;
			next();
		});
	} else {
		return res.status(401).json({
			success: false,
			message: "You are not authenticated!",
		});
	}
};

// Function to check authorization
export const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to perform this action!",
			});
		}
	});
};

// Function to check if the user is an admin
export const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to perform this action!",
			});
		}
	});
};
