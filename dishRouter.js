const express = require("express");

const dishRouter = express.Router();

dishRouter.get("/:dishId", (req, res) => {
	const id = req.params.dishId;
	res.status(200).json({ id });
});

dishRouter.put("/:dishId", (req, res) => {
	res.status(403).json("Not supported");
});

dishRouter.post("/:dishId", (req, res) => {
	const body = req.body;
	res.status(200).json({ body });
});
dishRouter.delete("/:dishId", (req, res) => {
	const id = req.params.dishId;
	res.status(200).json(`delete dish with id = ${id}`);
});
module.exports = dishRouter;
