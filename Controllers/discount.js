
const Discount = require("../Models/discount.js");

const discountPrice = async(req,res) => { 
   let {discount, originalPrice} = req.body;
    var discountuse =discount/100;
    var totalPrice = originalPrice - (originalPrice * discountuse);
    try{
        let Price = await Discount({
            discount: discountuse,
            originalPrice: originalPrice,
            finalPrice: totalPrice
        }).save();
        if(!Price){
            throw new error;
        }
        return res.status(200).json({
          
            "sucess":[{
                "msg": "Discount applied",
                "data": Price
            }]
        })
    }catch(err) {
        return res.status(500).json({
            "success": false,
            error: err.message
        })
    }
}

module.exports = {
    discountPrice: discountPrice
}