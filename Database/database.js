const mongoose = require("mongoose");
const dotenv = require("dotenv");


mongoose
  .connect(
    "mongodb+srv://nikhil:nikhil123@cluster0.aqxz4h6.mongodb.net/Ecommerce?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    }
    
  )
  .then(() => {
    console.log("Database Connected ");
  })
  .catch((err) => {
    console.log(err);
  });

//   sequelize
//   .authenticate()
//   .then(() => console.log('Connection has been establish' ))
//   .catch(err => console.error('Unable to connect database:', err));
//   const db = {};
//   db.Sequelize = Sequelize;
//   db.sequelize = sequelize;


//   db.discount = require('../Models/discount1')(sequelize,Sequelize);

// module.exports = db;
module.exports = mongoose;