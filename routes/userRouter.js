const express = require("express");
const Router = express.Router;
const User = require("../models/User");
const userRouter = Router();

userRouter.post("/signup", (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	User.findOne({ username })
		.then(
			(user) => {
				if (user !== null) {
					const err = new Error(`User ${username} already exists`);
					err.status = 403;
					next(err);
				} else {
					return User.create({ username, password }).then((user) =>
						res.status(201).send(user),
					);
				}
			},
			(err) => next(err),
		)
		.catch((err) => next(err));
});

userRouter.post("login", (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!req.session.user) {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			const err = new Error("You are not authorization");
			res.setHeader("WWW-Authenticate", "Basic");
			err.status(401);
			return next(err);
		}

		User.find({ username })
			.then((user) => {
				if (user === null) {
					const err = new Error(`User no registration`);
					err.status(403);
					return next(err);
				} else if (password !== user.password) {
					const err = new Error(`Password error`);
					err.status(403);
					return next(err);
				} else if (username === user.username && password === user.password) {
					req.session.user = "authenticated";
					res.status(200).send(user);
				}
			})
			.catch((err) => next(err));
	}
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
