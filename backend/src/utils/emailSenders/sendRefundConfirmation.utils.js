import { transporter } from "../../config/emailTransporter.confilg.js";
import { refundConfirmationTemp } from "../../emailTemplate/refundConfirmationTemp .js";
<<<<<<< HEAD
import { ApiError } from "../apiError.js";
=======
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95





export const sendEmailRefundConfirmation = async (order,refundedProducts,email, userName) => {

<<<<<<< HEAD
const mailOptions = {
  from: `"SaadiCollection.shop" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Your refund has been processed successfully",
  html: refundConfirmationTemp(order, refundedProducts, userName),
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
    subject: "Your refund has been processed successfully",
    html: refundConfirmationTemp(order, refundedProducts, userName),
  };
  
  const info = await transporter.sendMail(mailOptions);
          return info;
} catch (error) {
  console.log('sendEmailRefundConfirmation error',error)
}
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
};