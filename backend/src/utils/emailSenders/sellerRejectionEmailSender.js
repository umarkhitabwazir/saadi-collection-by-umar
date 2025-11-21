<<<<<<< HEAD
import { ApiError } from "../apiError.js";
=======
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
import { transporter } from "../../config/emailTransporter.confilg.js";
import { sellerRejectionTemp } from "../../emailTemplate/sellerRejectionTemp.js";





export const sellerRejectionEmailSender= async (email,name) => {

<<<<<<< HEAD
    const mailOptions = {
  from: `"SAADiC Admin" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Your Store Request Has Been Rejected",
  html:sellerRejectionTemp(name,)
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
   from: `"SAADiC Admin" <${process.env.EMAIL_USER}>`,
   to: email,
   subject: "Your Store Request Has Been Rejected",
   html:sellerRejectionTemp(name,)
 };
 
 const info = await transporter.sendMail(mailOptions);
         return info;
 } catch (error) {
  console.log('sellerRejectionEmailSender error',error)
 }
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
};