const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const express = require("express");
const dishRouter = require("./dishRouter");
const leadersRouter = require("./leaderRouter");
const promotionsRouter = require("./promoRouter");
const userRouter = require("./routes/userRouter");
const password = require("passport");
const authenticate = require("./authenticate");

const app = express();

function auth(req, res, next) {
	if (!req.user) {
		const err = new Error("You no autorization");
		err.status(403);
		next();
	} else {
		next();
	}
}
app.use(passport.initialize());
app.use(passport.session());
app.use("/user", userRouter);
app.use(
	session({
		name: "session-id",
		secret: "12345-67890-09876-54321",
		saveUninitialized: false,
		resave: false,
		store: new FileStore(),
	}),
);
app.use(auth);
app.use(bodyParser.json());
app.use("/dishes", dishRouter);
app.use("/promotions", promotionsRouter);
app.use("/leaders", leadersRouter);
app.listen(3000, () => console.log("Server has been started"));
