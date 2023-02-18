const booksRouter = require("./books");
const authorsRouter = require("./authors");
const categoriesRouter = require("./categories");
const ordersRouter = require("./orders");
const express = require("express");
const apiRouter = express.Router();

apiRouter.use('/books', booksRouter);

apiRouter.use('/authors', authorsRouter);

apiRouter.use('/categories', categoriesRouter);

apiRouter.use('/orders', ordersRouter);

module.exports = apiRouter;
