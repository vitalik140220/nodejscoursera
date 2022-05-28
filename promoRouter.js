const express = require("express");

const Promotions = require("./promotions");
const promotionsRouter = express.Router();

promotionsRouter.get("/:promotionId", (req, res, next) => {
	const id = req.params.promotionId;
	Promotions.findById(id)
		.then(
			(leader) => {
				res.status(200).json({ leader });
			},
			(err) => next(err),
		)
		.catch((err) => next(err));
});

promotionsRouter.put("/:promotionId", (req, res, next) => {
	const body = req.body;
	const id = req.params.promotionId;
	Promotions.findByIdAndUpdate(id, body)
		.then(
			(leader) => {
				res.status(200).json(leader);
			},
			(err) => next(err),
		)
		.catch((err) => next(err));
});

promotionsRouter.post("/:promotionId", (req, res, next) => {
	res.status(403).json("No supported");
});
promotionsRouter.delete("/:promotionId", (req, res, next) => {
	const id = req.params.promotionId;
	Promotions.findByIdAndRemove(id)
		.then(
			(response) => res.status(200).json(response),
			(err) => next(err),
		)
		.catch((err) => next(err));
	res.status(200).json(`delete promotion with id = ${id}`);
});

promotionsRouter.get("/", (req, res, next) => {
	Promotions.find({})
		.then(
			(leaders) => res.status(200).json(leaders),
			(err) => next(err),
		)
		.catch((err) => next(err));
});

promotionsRouter.put("/", (req, res) => {
	res.status(403).json("Not supported");
});

promotionsRouter.post("/", (req, res) => {
	res.status(403).json("Not supported");
});
promotionsRouter.delete("/", (req, res, next) => {
	Promotions.findAndRemove({})
		.then(
			(response) => res.status(200).json(response),
			(err) => next(err),
		)
		.catch((err) => next(err));
});
module.exports = promotionsRouter;
