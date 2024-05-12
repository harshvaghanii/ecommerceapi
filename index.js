import express from "express";
const app = express();
import { connect } from "mongoose";
import { config } from "dotenv";
config();
const PORT = process.env.PORT;

app.use(express.json());

// Importing Routes
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";

// End of Routes Import

connect(process.env.MONGO_URL, {})
	.then(() => {
		console.log("DB Connected!");
	})
	.catch((err) => console.log(err));

// API End Points
app.use("/api/auth", authRoute);
app.use("/api/users/", userRoute);

app.listen(PORT, () => {
	console.log(`server running at http://localhost:${PORT}`);
});
