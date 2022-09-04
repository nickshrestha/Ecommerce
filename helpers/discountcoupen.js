function coupongenerator() {
    var coupon = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < {code}; i++) {
    coupon += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    let isExistDiscount = false
do {
let myDiscountCode = coupongenerator()
let newDiscountCode = new DiscountCode({
code: myDiscountCode,
isPercent: false,
amount: [{ IRT: 5000 }, { USD: 5 }, { EUR: 5 }],
expireDate: '',
isActive: true
})
newDiscountCode.save(function (err) {
if (err) {
if (err.name === 'MongoError' && err.code === 11000) {
// Duplicate code detected
isExistDiscount = true;
}
}
res.send({
//success message render
})
})
}
while (isExistDiscount);
    }
    module.exports = coupongenerator;