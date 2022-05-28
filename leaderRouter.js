const express = require("express");
const Leaders = require("./leaders");
const leadersRouter = express.Router();

leadersRouter.get("/:leaderId", (req, res, next) => {
	const id = req.params.leaderId;
	Leaders.findById(id)
		.then(
			(leader) => {
				res.status(200).json({ leader });
			},
			(err) => next(err),
		)
		.catch((err) => next(err));
});

leadersRouter.put("/:leaderId", (req, res, next) => {
	const body = req.body;
	const id = req.params.leaderId;
	Leaders.findByIdAndUpdate(id, body)
		.then(
			(leader) => {
				res.status(200).json(leader);
			},
			(err) => next(err),
		)
		.catch((err) => next(err));
});

leadersRouter.post("/:leaderId", (req, res, next) => {
	res.status(403).json("No supported");
});
leadersRouter.delete("/:leaderId", (req, res, next) => {
	const id = req.params.leaderId;
	Leaders.findByIdAndRemove(id)
		.then(
			(response) => res.status(200).json(response),
			(err) => next(err),
		)
		.catch((err) => next(err));
	res.status(200).json(`delete leader with id = ${id}`);
});

leadersRouter.get("/", (req, res, next) => {
	Leaders.find({})
		.then(
			(leaders) => res.status(200).json(leaders),
			(err) => next(err),
		)
		.catch((err) => next(err));
});

leadersRouter.put("/", (req, res) => {
	res.status(403).json("Not supported");
});

leadersRouter.post("/", (req, res) => {
	res.status(403).json("Not supported");
});
leadersRouter.delete("/", (req, res, next) => {
	Leaders.findAndRemove({})
		.then(
			(response) => res.status(200).json(response),
			(err) => next(err),
		)
		.catch((err) => next(err));
});
module.exports = leadersRouter;
