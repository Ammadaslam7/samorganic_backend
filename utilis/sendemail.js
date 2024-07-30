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
    html:`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Inline CSS styles */
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; }
        .header { background-color: #333; color: #ffffff; padding: 10px; text-align: center; border-radius: 5px 5px 0 0; }
        .footer { text-align: center; color: #777; font-size: 12px; margin-top: 20px; }
        .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${order.firstName}</strong>,</p>
          <p>Thank you for your order! Here are the details:</p>
          <ul>
            <li><strong>Order Number:</strong> ${order.orderNumber}</li>
            <li><strong>Product:</strong> ${order.productName}</li>
            <li><strong>Quantity:</strong> ${order.quantity}</li>
            <li><strong>Total:</strong> ${order.total} PKR</li>
          </ul>
        </div>
        <div class="footer">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = sendOrderConfirmationEmail;
