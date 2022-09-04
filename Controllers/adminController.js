require("../database/database.js");
const bcryptjs = require("bcryptjs")
const Admin = require('../Models/admin.js');
// const { resetMailer } = require("../helpers/resetmailer.js");
// const { generateResetToken } = require("../helpers/resetToken.js");
const jwt = require("jsonwebtoken");
const { emptyQueryValidator, bodyValidator, emptyFieldValidator, emptyBodyValidator } = require("../utils/validator.js");



// create admin 
const createAdmin = async (req, res) => {
    try {
      
          let {
            full_name,
            email,
            address,
            contact,
            password,
            
          } = req.body;
          
          let fields = [full_name,
            email,
            address,
            contact,
            password,
            
          ]
            
           
                    const value = await Admin.findOne({
                      email
                    });
                  
                    if (value) {
                      return res.status(422).json ({ message: " Email already taken"});
  
                  
      }
      
      
     
          
          
          const salt = await bcryptjs.genSalt();
          const hashedPasswd = await bcryptjs.hash(password, salt);
          let data = await new Admin({
            full_name,
            email,
            address,
            contact,
            password: hashedPasswd,
                       
          })
          .save();
          
          
          
          if (!data) {
       return res.status(500).json({message: "cannot create user!" });
  
      }
      return res.status(200).json({
        data: {
          id: data._id,
          name: data.name,
          email: data.email,
          address: data.address,
          contact: data.contact,
         
          message: "Creating admin  sucessfully.",
        }
      })
  } catch (err) {
   return res.status(500).json({ message: err.message });
  }
};
    
    //   Login Admin
const loginAdmin = async (req, res) => {
  try {
    if (emptyQueryValidator(req.query, res) || bodyValidator(req.body, res))
      return;
    let { email, password } = req.body;
    var fields = [email, password];
    if (emptyFieldValidator(fields, res)) return;
    const data = await Admin.findOne({
      email,
    });

    if (!data) {
      return res.status(400).json({
        
        message: "Invalid email or password",
        
      });
    }
    const validPassword = await bcryptjs.compare(password, data.password);
    if (!validPassword) {
      return res.status(422).json({
     
        message: "Invalid email or password",
     
      });
    }

    if (!validPassword) {
      return res.status(500).json({
        message: "Invalid email or password",
      });

      if (!data) {
      return res.status(500).json({message: "Invalid email or password" });
    }
    }
    if (validPassword) {
      //jsonwebtoken is created
      const token = jwt.sign(
        { id: data.id},
        process.env.JWT_SECRET_KEY,
        { expiresIn: "10m" }
      );
      res.cookie("jsonwebToken", token, {
        expires: new Date(Date.now() + 300000),
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });
      const { password, ...others } = data._doc;
      return res.status(200).json({ others, token });
    }
    else {
      return res.status(401).json({ error: "Admin does not exist" });
    }
    

    const result = {
      name: data.name,
      email: data.email,
    };
     res.status(200).json({
      data: {
        id: data._id,
        name: data.name,
        email: data.email,
        message: "login sucessfully.",
      }
    })
  } catch (err) {
   return res.status(500).json({ message: err.message });
  }
};


// reset password
 const resetPassword = async (req, res) => {
  try {
    if (emptyQueryValidator(req.query, res) || bodyValidator(req.body, res))
      return;
    let { email, newPassword, confirmPassword } = req.body;
    var fields = [email, newPassword, confirmPassword];
    if (emptyFieldValidator(fields, res)) return;
    if (newPassword !== confirmPassword) {
      return res.status(422).json({
        message: "Password does not match",
      });
    }

    const salt = await bcryptjs.genSalt();
    const hashedPasswd = await bcryptjs.hash(confirmPassword, salt);
    const data = await Admin.findOneAndUpdate({email}, {password: hashedPasswd,
    });
    
    if (!data) return res.status(402).json({ message: err.message });
    return res.status(200).json({
      data: "Password was sucessfully changed"
    });
    return res.status(200).send(data)
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// // // Forget Password 
// //  const forgetPassword = async (req, res) => {
// //   try {
// //     if (emptyQueryValidator(req.query, res) || bodyValidator(req.body, res))
// //       return;
// //     let { email } = req.body;
// //     if (!email) {
// //       return res.status(500).json({message: "Require Email" });
// //     }
// //     const data = await Admin.findOne({ email: req.body.email });
// //     if (!data) {
// //       return res.status(500).json({message: "Email does not exists." });
      
// //     }
// //     const token = await generateResetToken(data);
// //     let url = `${process.env.RESET_PASSWORD_URL}/#/reset/${data._id}/${token}`;
// //     await resetMailer(data.email, data.name, url);
// //     return res.status(200).send({message: "Mail sent sucessfully." });
      
// //   } catch (err) {
// //     return res.status(500).json({  message: "Email does not exist."});
// //   }
// // };



// // Forget password
// const forgetPassword = async (req, res) => {
//   try {


    
//     if (emptyQueryValidator(req.query, res) || bodyValidator(req.body, res))
//       return;
      
//     let { email } = req.body;
//     if (!email) {
//       return res.status(400).json({
//         message: "Email is required",
//       });
//     }
//     const data = await Admin.findOne({ email });
//     if (!data) {
//       return res.status(404).json({
//         message: "Email does not exists."
//       });
//     }
    
//     const token = await generateResetToken(data);
  

//     let url = `${process.env.RESET_PASSWORD_URL}/#/reset/${data._id}/${token}`;
   
//     await resetMailer(data, url);
  

//     return res.status(200).json({
//       data: {
//         name: data.name,
//         email: data.email,
//         message: "Mail sent sucessfully.",
//       }
//     });
    
//   } catch (err) {
//     return res.status(500).json({  message: err.message});
//   }
// };


// // logout Admin
//  const logout = async (req, res) => {
//   try {
//     if (
//       emptyQueryValidator(req.query, res) ||
//       emptyBodyValidator(req.body, res)
//     )
//       return;
//     const { authorization } = req.headers;

//     if (!authorization) {
//       return res.status(401).json({
//           message: "Access denied. Invalid token",
//              });
//     }

//     const token = authorization.replace("Bearer ", "");

//     const data = await RefreshTokenModel.findOneAndDelete({
//       refreshToken: token,
//     });
//     if (!data) {
//       return res.status(200).json({
        
//         message: "No token found.."
//       });
//     }
//     return res.status(200).json({ data: "Token removed sucessfully"});
//   } catch (err) {
//     return res.status(500).json({  message: err.message});
//   }
// };


module.exports = {createAdmin
    , loginAdmin
    ,resetPassword
    // , forgetPassword
    // , logout
}
