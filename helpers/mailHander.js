import nodemailer from "nodemailer";

export function mailSender(req, res) {
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d40f253140823c",
      pass: process.env.mailingPassword,
    },
  });
  var mailOptions = {
    from: "d40f253140823c",
    to: req.email,
    subject: "Thanks for your Order",
    html: `<h2 >Hello!</h2>
          <p> Dear, ${req.username} your order for cart id ${req.id} is ${req.orderStatus}.</p>
          <h4>Sincerely</h4><br>
          <h3>Dumpling Store</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return { error: error };
    } else {
      return "Email was sent successfully: " + info.response;
    }
  });
}