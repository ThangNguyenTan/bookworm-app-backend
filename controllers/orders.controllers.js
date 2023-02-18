const {
  orders: Orders,
  order_items: OrderItems,
  books: Books,
  authors: Authors,
} = require("../models");
const { validateOrderItems } = require("../validations/orders.validations");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");

const getAllOrders = async (req, res) => {
  const orderList = await Orders.findAll({
    attributes: ["id", "order_date", "order_amount"],
    include: [{ model: OrderItems, attributes: ["id"] }],
    order: [["id", "ASC"]],
  });

  return res.status(StatusCodes.OK).json(orderList);
};

const createOrder = async (req, res, next) => {
  const { order_amount } = req.body;
  const orderItems = req.body.order_items;

  const invalidBookID = await validateOrderItems(orderItems);

  if (invalidBookID) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        `The product with an ID of ${invalidBookID} does not exist`,
        {
          invalidBookID,
        }
      )
    );
  }

  const createdOrder = await Orders.create({
    order_amount,
  });

  for (let i = 0; i < orderItems.length; i++) {
    const orderItem = orderItems[i];

    await OrderItems.create({
      orderId: createdOrder.id,
      bookId: orderItem.bookId,
      quantity: orderItem.quantity,
      price: orderItem.price,
    });
  }

  return res.status(StatusCodes.CREATED).json(createdOrder);
};

const getOrderByID = async (req, res, next) => {
  const id = req.params.id;

  // These variables are for nested relationship fetching
  // In order to get enough data for an order details to display
  // Including: books, author, order items and order details.
  const includeAuthor = [
    {
      model: Authors,
      attributes: ["id", "author_name"],
    },
  ];
  const includeBook = [
    {
      model: Books,
      attributes: ["id", "book_title", "book_cover_photo"],
      include: includeAuthor,
    },
  ];
  const includeOrderItems = [
    {
      model: OrderItems,
      attributes: ["id", "quantity", "price"],
      include: includeBook,
    },
  ];

  const order = await Orders.findOne({
    where: {
      id,
    },
    attributes: ["id", "order_date", "order_amount"],
    include: includeOrderItems,
  });

  if (!order) {
    return next(
      createError(StatusCodes.NOT_FOUND, "There is no record with this ID")
    );
  }

  return res.status(StatusCodes.OK).json(order);
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderByID,
};
