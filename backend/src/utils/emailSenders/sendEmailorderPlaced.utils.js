import { transporter } from "../../config/emailTransporter.confilg.js";
import { orderConfirmationTemp } from "../../emailTemplate/orderPlaced.template.js";
import { ApiError } from "../apiError.js";





export const sendEmailOrderPlaced = async (order,orderedProduct,email, userName) => {
try {
    
        const mailOptions = {
      from: `"noreply" ${process.env.EMAIL_USER}`,
      to: email,
      subject: "Order placed – cancel within 15 minutes",
      html:orderConfirmationTemp(order,orderedProduct,userName)
    };
    
     const info = await transporter.sendMail(mailOptions);
    return info;
} catch (error) {
    console.log('sendEmailOrderPlaced error',error)
  throw new   ApiError(error)
}
};