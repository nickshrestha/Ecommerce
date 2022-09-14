const product = require("../Models/producModel.js")
const orders = require("../Models/orderModel.js")
const Cart = require("../Models/cartModel.js")
const mailSender = require("../helpers/mailHander.js");


const CreateOrder = async (req, res) => {
  try {
    
    const Product = await product.findOne({_id: req.body.productId});
    if (!Product){
      res.status(404).json({msg: 'Product Id not found'});
      return;
    }

    let order_data = new orders({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId

    });

 let data = await order_data.save();
   if (!data){ res.status(404).json({
    msg: "cannot be Added"
   });
  }
   res.status(201).json({
    success: true, data: data,
    msg: "order added"
   })
        }catch(error){
            res.status(400).json({success: false, msg:error.message});
        }
    
};
 











  
//     const order  =  new orders({
//       _id: mongoose.Types.ObjectId(),
//       quantity: req.body.quantity,
//       product: req.body.productId
//     });
//     order.save()
//     .then(result => {
//       console.log(result);
//       res.status(201).json(result)
//     }).catch (err => {
//       console.log(err);
//       res.status(500).json({error: err});
//     });
// }





      // let {productId,stockQuantity} = req.body;
      // const orderItemsIds = Promise.all(
      // req.body.orders.map(async (orderItem) => {
      //     const Product = await product.findOne({
      //       productId: orderItem.productId,
      //     });
          

      //     let newOrderItem = new order({
      //       quantity: orderItem.quantity,
      //       Product: Product._id,
      //     });

      //     const addedOrder = await newOrderItem.save();
      //     return addedOrder._id;
      //   })
      // );

      // const orderItemsIdsResolved = await orderItemsIds;

      // //checks stock availability calculate total price

      // const totalPrices = await Promise.all(
      //   orderItemsIdsResolved.map(async (orderItemsId) => {
      //     const orderItem = await order.findById(orderItemsId).populate(
      //       "product",
      //       "name _id stockQuantity price"
      //     );

      //     if (orderItem.quantity <= orderItem.product.stockQuantity) {
      //       let total = orderItem.product.price * orderItem.quantity;
      //       return total;
      //     } else {
      //       throw `Ordered Quantity for${orderItem.product.name} exceeds the Stock Quantity`;
      //     }
      //   })
      // );

      // const totalPrice = totalPrices.reduce(
      //   (firstItem, nextItem) => firstItem + nextItem,
      //   0
      // );
   

      // let newCart = new Cart({
      //   id: id,
      //   orders: orderItemsIdsResolved,
      //   username: username,
      //   address: address,
      //   email: email,
      //   phone: phone,
      //   TotalPrice: TotalPrice,
      // });
      // let cartAdded = await newCart.save();

      // if (cartAdded) {
      //   mailSender(cartAdded, res);

      //   //decrease and update new stock
      //   orderItemsIdsResolved.map(async (orderItemsId) => {
      //     const orderItem = await orders.findById(orderItemsId).populate(
      //       "product",
      //       "_id stockQuantity"
      //     );

      //     if (orderItem.quantity <= orderItem.product.stockQuantity) {
      //       let newStockQuantity =
      //         orderItem.product.stockQuantity - orderItem.quantity;

      //       const updatedStock = await product.findByIdAndUpdate(
      //         orderItem.product._id,
      //         {
      //           stockQuantity: newStockQuantity,
      //         },
      //         { new: true }
      //       );
      //       if (!updatedStock) {
      //         throw "Updating Stock Failed Successfully";
      //       }
      //     } else {
      //       throw `Ordered Quantity for${orderItem.product.name} exceeds the Stock Quantity`;
      //     }
      //   })

      //   return res.status(200).json({ data: cartAdded });
      // }
   


  // get all orders
  const getAllOrders = async (req, res) => {
    try {
      const orderList = await Cart.find().populate({
        path: "order",
        populate: { path: "product", select: "name price" },
      });

      res.status(200).json({ success: true, data: orderList });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  };

 const  getOrderByUser = async (req, res) => {
    try {
      const userOrder = await Cart.findOne({
        username: req.params.username,
      });
      res.status(200).json({ success: true, data: userOrder });
    } catch (err) {
      res.status(400).json({ success: false, Error: err });
    }
  };

 const  updateOrderStatus = async (req, res) => {
    try {
      const updatedOrder = await Cart.findOneAndUpdate(
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
  };

  const getCartCount = async (req, res) => {
    try {
      const cartCount = await Cart.count();
      res.status(200).json({ success: true, data: cartCount });
    } catch (err) {
      res.status(500).json({ success: false, data: err });
    }
  };

 const  getTotalSales =  async (req, res) => {
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
  };

module.exports = {CreateOrder};