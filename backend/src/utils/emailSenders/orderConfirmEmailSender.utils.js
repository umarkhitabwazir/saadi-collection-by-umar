import { transporter } from "../../config/emailTransporter.confilg.js";
import { orderConfirmationTemp } from "../../emailTemplate/orderConfirnedTemp.js";






export const sendEmailOrderConfirmed= async (order) => {

try {
      const mailOptions = {
    from: `"SAADIcollection.shop" ${process.env.EMAIL_USER}`,
    to:order.userId.email,
    subject: "Your Order Has Been Confirmed",
    html:orderConfirmationTemp(order)
  };
  
  const info = await transporter.sendMail(mailOptions);
          return info;
} catch (error) {
  console.log("sendEmailOrderConfirmed error",error)
}
};