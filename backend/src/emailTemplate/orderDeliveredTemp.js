export const orderDelivered = (orderId) => {
  const websiteUrl = process.env.WEBSITE_URL;

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Order Delivered</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f5f7;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              padding: 35px 28px;
              border-radius: 12px;
              box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
              color: #333;
          }
          .header {
              text-align: center;
              margin-bottom: 25px;
          }
          .header h1 {
              font-size: 26px;
              margin: 0;
              color: #2c3e50;
          }
          .content p {
              font-size: 16px;
              line-height: 1.6;
              color: #555;
              margin-bottom: 14px;
          }
          .order-box {
              background: #f9fafc;
              border: 1px solid #e1e4e8;
              padding: 18px 20px;
              border-radius: 8px;
              margin: 22px 0;
          }
          .order-box p {
              margin: 0;
              font-size: 15px;
              color: #444;
          }
          .btn {
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              padding: 10px 18px;
              text-decoration: none;
              border-radius: 5px;
              font-size: 15px;
              margin-top: 20px;
              font-weight: 600;
          }
          .btn:hover {
              background-color: #0056b3;
          }
          .footer {
              margin-top: 35px;
              text-align: center;
              font-size: 13px;
              color: #777;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Order Delivered</h1>
          </div>

          <div class="content">
              <p>Your order has been delivered successfully.</p>
              <p>Thank you for choosing our service.</p>

              <div class="order-box">
                  <p><strong>Tracking ID:</strong> ${orderId}</p>
              </div>

              <p>You can check your delivered orders anytime from your dashboard.</p>

              <a href="${websiteUrl}/buyer/orders?tab=delivered" class="btn">View Orders</a>

              <div class="footer">
                  © ${new Date().getFullYear()} saadiCollection.shop. All rights reserved.
              </div>
          </div>
      </div>
  </body>
  </html>`;
};
