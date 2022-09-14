
const product = require("../Models/producModel.js").default
const order = require("../Models/orderModel.js").default
const Cart = require("../Models/cartModel.js").default
const mailSender = require("../helpers/mailHander.js").default

const cartController = {
  createCart: async (req, res) => {
    try {
      const orderItemsIds = Promise.all(
        req.body.orders.map(async (orderItem) => {
          const Product = await product.findOne({
            productId: orderItem.productId,
          });

          let newOrderItem = new OrderDB({
            quantity: orderItem.quantity,
            Product: Product._id,
          });

          const addedOrder = await newOrderItem.save();
          return addedOrder._id;
        })
      );

      const orderItemsIdsResolved = await orderItemsIds;

      //checks stock availability calculate total price

      const totalPrices = await Promise.all(
        orderItemsIdsResolved.map(async (orderItemsId) => {
          const orderItem = await OrderDB.findById(orderItemsId).populate(
            "product",
            "name _id stockQuantity price"
          );

          if (orderItem.quantity <= orderItem.product.stockQuantity) {
            let total = orderItem.product.price * orderItem.quantity;
            return total;
          } else {
            throw `Ordered Quantity for${orderItem.product.name} exceeds the Stock Quantity`;
          }
        })
      );

      const totalPrice = totalPrices.reduce(
        (firstItem, nextItem) => firstItem + nextItem,
        0
      );
      let crId = uniqueId("CR");

      let newCart = new CartDB({
        id: crId,
        orders: orderItemsIdsResolved,
        username: req.body.username,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        totalPrice: totalPrice,
      });
      let cartAdded = await newCart.save();

      if (cartAdded) {
        mailSender(cartAdded, res);

        //decrease and update new stock
        orderItemsIdsResolved.map(async (orderItemsId) => {
          const orderItem = await OrderDB.findById(orderItemsId).populate(
            "product",
            "_id stockQuantity"
          );

          if (orderItem.quantity <= orderItem.product.stockQuantity) {
            let newStockQuantity =
              orderItem.product.stockQuantity - orderItem.quantity;

            const updatedStock = await ProductDB.findByIdAndUpdate(
              orderItem.product._id,
              {
                stockQuantity: newStockQuantity,
              },
              { new: true }
            );
            if (!updatedStock) {
              throw "Updating Stock Failed Successfully";
            }
          } else {
            throw `Ordered Quantity for${orderItem.product.name} exceeds the Stock Quantity`;
          }
        });

        res.status(200).json({ data: cartAdded });
      }
    } catch (err) {
      res.status(500).json({ success: false, Error: err });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orderList = await CartDB.find().populate({
        path: "orders",
        populate: { path: "product", select: "name price" },
      });

      res.status(200).json({ success: true, data: orderList });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  },

  getOrderByUser: async (req, res) => {
    try {
      const userOrder = await CartDB.findOne({
        username: req.params.username,
      });
      res.status(200).json({ success: true, data: userOrder });
    } catch (err) {
      res.status(400).json({ success: false, Error: err });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const updatedOrder = await CartDB.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );
      if (updatedOrder) {
        res.status(200).json({ success: true, data: updatedOrder });
        mailSender(updatedOrder, res);
      }
    } catch (err) {
      res.status(500).json({ success: false, Error: err });
    }
  },

  getCartCount: async (req, res) => {
    try {
      const cartCount = await CartDB.count();
      res.status(200).json({ success: true, data: cartCount });
    } catch (err) {
      res.status(500).json({ success: false, data: err });
    }
  },

  getTotalSales: async (req, res) => {
    try {
      const sales = await cartModel.find();
      const totalSales = 0;
      sales.map((sale) => {
        totalSales = totalSales + sale.totalPrice;
      });

      res.status(200).json({
        success: true,
        data: {
          totalSales: totalSales,
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, Error: err });
    }
  },
};

export default cartController;