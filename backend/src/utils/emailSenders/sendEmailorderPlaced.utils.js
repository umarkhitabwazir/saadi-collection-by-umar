import { transporter } from "../../config/emailTransporter.confilg.js";
import { orderConfirmationTemp } from "../../emailTemplate/orderPlaced.template.js";
import { ApiError } from "../apiError.js";


<<<<<<< HEAD
const EMAIL_USER = process.env.EMAIL_USER

export const sendEmailOrderPlaced = async (order, orderedProduct, email, userName) => {

    if (!EMAIL_USER) {
        throw new ApiError('owner email not found ')
    }
    const mailOptions = {
        from: `"noreply" ${EMAIL_USER}`,
        to: email,
        subject: "Order placed – cancel within 15 minutes",
        html: orderConfirmationTemp(order, orderedProduct, userName)
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
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
};