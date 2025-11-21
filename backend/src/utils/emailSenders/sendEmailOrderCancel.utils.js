import { transporter } from "../../config/emailTransporter.confilg.js";
import { orderCancelTemp } from "../../emailTemplate/orderCancelTemp.js";
<<<<<<< HEAD
import { ApiError } from "../apiError.js";
=======

>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95





export const sendEmailOrderCancel = async (order,paymentData,orderCancelProducts,email, userName,transactionId) => {

<<<<<<< HEAD
const mailOptions = {
  from: `"SaadiCollection.shop" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: transactionId
    ? "Order Cancelled – Refund Initiated"
    : "Order Cancelled Successfully",
  html: orderCancelTemp(order,paymentData, orderCancelProducts, userName),
};

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            
            if (error) {
                console.error("Failed to send email:", error);
                return reject(new ApiError(500, "Failed to send email"));
            }
            resolve(info);
        });
    });
=======
try {
  const mailOptions = {
    from: `"SaadiCollection.shop" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: transactionId
      ? "Order Cancelled – Refund Initiated"
      : "Order Cancelled Successfully",
    html: orderCancelTemp(order,paymentData, orderCancelProducts, userName),
  };
  
  const info = await transporter.sendMail(mailOptions);
          return info;
} catch (error) {
  console.log('sendEmailOrderCancel error',error)
}
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
};