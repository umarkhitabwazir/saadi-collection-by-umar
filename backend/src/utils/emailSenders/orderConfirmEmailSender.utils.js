import { transporter } from "../../config/emailTransporter.confilg.js";
import { orderConfirmationTemp } from "../../emailTemplate/orderConfirnedTemp.js";
<<<<<<< HEAD
import { ApiError } from "../apiError.js";
=======

>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95





export const sendEmailOrderConfirmed= async (order) => {

<<<<<<< HEAD
    const mailOptions = {
  from: `"SAADIcollection.shop" ${process.env.EMAIL_USER}`,
  to:order.userId.email,
  subject: "Your Order Has Been Confirmed",
  html:orderConfirmationTemp(order)
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
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
};