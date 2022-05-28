const express = require("express");
const Router = express.Router;
const User = require("../models/User");
const passport = require("passport");
const userRouter = Router();

userRouter.post("/signup", (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	User.register(new User({ username }), password, (err, user) => {
		if (err) {
			res.status(500).send(err);
		} else {
			passport.authenticate("local")(req, res, () => {
				res.status(201).send(user);
			});
		}
	});
});

userRouter.post("login", passport.authenticate("local"), (req, res, next) => {
	res.status(200).send("good");
});

userRouter.get("/logout", (req, res, next) => {
	if (req.session) {
		req.session.destroy();
		res.clearCookie("session-id");
		res.redirect("/");
	} else {
		const err = new Error("You are not login");
		err.status(403);
		next(err);
	}
});

module.exports = userRouter;
