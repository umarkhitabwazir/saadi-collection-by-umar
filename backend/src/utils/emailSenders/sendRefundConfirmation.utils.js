import { transporter } from "../../config/emailTransporter.confilg.js";
import { refundConfirmationTemp } from "../../emailTemplate/refundConfirmationTemp .js";





export const sendEmailRefundConfirmation = async (order,refundedProducts,email, userName) => {

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
};