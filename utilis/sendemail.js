// mailer.js
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net' , 
  port: 465,
  secure: true,
  auth: {
    user: "info@samorganic.co",
    pass: "Organic1234@"
  }
 
});

// Function to send an email
const sendOrderConfirmationEmail = (order) => {
  const mailOptions = {
    from: 'info@samorganic.co',
    to: order.email,
    subject: 'Order Confirmation',
    text: `Thank you for your order, ${order.firstName}! Your order details are as follows:\n
    Order Number: ${order.orderNumber}
    Product: ${order.productName}
    Quantity: ${order.quantity}
    Total: ${order.total} PKR`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = sendOrderConfirmationEmail;
