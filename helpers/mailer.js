const nodemailer = require("nodemailer");



let transporter = nodemailer.createTransport({
  // pool: true,
  host: 'host',
    service: "gmail",
    auth: {
      user: "lihkinshrestha@gmail.com",
      pass: "xhciidoppaofbtgg",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
  },
});

const mailer = async (data) => {
  try {
    
    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: req.email,
      subject: "Your order is added sucessfully",
      html: `<h2 >Hello!</h2>
      <p> Dear, ${req.username} your order for cart id ${req.id} is ${req.orderStatus}.</p>
      <h4>Sincerely</h4><br>
      <h3>Dumpling Store</h3>`,
    });
    return true;
  } catch (err) {
    return false;
  }
};



module.exports = { mailer};
