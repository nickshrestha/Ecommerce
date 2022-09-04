const mongoose = require("mongoose");

const discountSchema = mongoose.Schema(
    {
        discountId: {
            type: String,
            autoIncrement: true
        },
        discount: {
            type:String,
        },
        OrginalPrice: {
            type: String,
        },
        finalPrice: {
            type: String
        }
    },{
        tableName: 'discounts'
    }
    )
    const discount = mongoose.model("discount", discountSchema);

    module.exports = discount;