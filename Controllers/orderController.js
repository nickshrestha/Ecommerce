const Product = require("../Models/producModel.js");
const mailer = require("../helpers/mailHander.js");
const Order = require("../Models/orderModel.js");
const Cart = require("../Models/cartModel.js");

//creating orders which are pendding
const createOrder = async (req, res) => {
  try {
    const orderItemsIds = Promise.all(
      req.body.orders.map(async (orderItem) => {
        const product = await Product.findOne({
          productId: orderItem.productId,
        });

        let newOrderItem = new Order({
          quantity: orderItem.quantity,
          product: product._id,
        });

        const addedOrder = await newOrderItem.save();
        return addedOrder._id;
      })
    );

    const orderItemsIdsResolved = await orderItemsIds;

    //checks stock availability calculate total price

    const totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async (orderItemsId) => {
        const orderItem = await Order.findById(orderItemsId).populate(
          "product",
          "name stockQuantity price"
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

    let newCart = new Cart({
      id: req.body.id,
      orders: orderItemsIdsResolved,
      username: req.body.username,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      totalPrice: totalPrice,
    });
    let cartAdded = await newCart.save();

    if (cartAdded) {
     await mailer(cartAdded);

      //decrease and update new stock
      orderItemsIdsResolved.map(async (orderItemsId) => {
        const orderItem = await Order.findById(orderItemsId).populate(
          "product",
          "stockQuantity"
        );

        if (orderItem.quantity <= orderItem.product.stockQuantity) {
          let newStockQuantity =
            orderItem.product.stockQuantity - orderItem.quantity;

          const updatedStock = await Product.findByIdAndUpdate(
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
      return res.status(200).json({ data: cartAdded });
    }
    if (!newOrderItems) {
      res.status(404).json({
        msg: "cannot be created",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orderList = await Cart.find().populate({
      path: "orders",
      populate: { path: "product", select: "name price" },
    });

    res.status(200).json({ success: true, data: orderList });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const userOrder = await Cart.findOne({
      username: req.params.username,
    });
    res.status(200).json({ success: true, data: userOrder });
  } catch (err) {
    res.status(400).json({ success: false, Error: err });
  }
};

// const updateOrderStatus =  async (req, res) => {
//   try {
//     const updatedOrder = await Cart.findOneAndUpdate(
//       { id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     if (updatedOrder) {
//       res.status(200).json({ success: true, data: updatedOrder });

//       let url = `${process.env.RESET_PASSWORD_URL}/#/reset/${data._id}/${token}`;

//   await Mailer(updatedOrder, url);
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, Error: err });
//   }
// };

const updateOrderStatus = async (req, res) => {
  try {
    let { orderStatus } = req.body;
    //validate request
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: "To update content can not be empty",
      });
      return;
    }

    const orderStatus1 = {
      orderStatus,
    };

    let data = await Cart.findOneAndUpdate(
      { id: req.params.id },
      orderStatus1,
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(404).json({
        success: false,
        message: `cannot update Status. Order not found!`,
      });
    }
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, Error: err, msg: "error" });
  }
};

const getCartCount = async (req, res) => {
  try {
    const cartCount = await Cart.count();
    res.status(200).json({ success: true, data: cartCount });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
};

const getTotalSales = async (req, res) => {
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
    res.status(500).json({ success: false, msg: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderByUser,
  updateOrderStatus,
  getCartCount,
  getTotalSales,
};
