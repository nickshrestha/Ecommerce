const product = require("../Models/producModel");

const add_product = async(req, res) => {
    try{
const product = new Product({

});
const product_data = await product.save();
res.status(200).send({success: true,msg: " product details",data: product_data});
    }catch(error){
        res.status(400).send({success: false, msg:error.message});
    }
}