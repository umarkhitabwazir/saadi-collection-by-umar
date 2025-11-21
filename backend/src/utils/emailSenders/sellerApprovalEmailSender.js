<<<<<<< HEAD
import { ApiError } from "../apiError.js";
=======
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
import { sellerApprovalTemp } from "../../emailTemplate/sellerApprovalTemp.js";
import { transporter } from "../../config/emailTransporter.confilg.js";





export const sellerApprovalEmailSender= async (name,email,randomPassword) => {

<<<<<<< HEAD
    const mailOptions = {
  from: `"SAADiC Admin" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Your Seller Account Has Been Approved",
  html:sellerApprovalTemp(name,email,randomPassword)
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
    subject: "Your Seller Account Has Been Approved",
    html:sellerApprovalTemp(name,email,randomPassword)
  };
  
  const info = await transporter.sendMail(mailOptions);
          return info;
} catch (error) {
  console.log('sellerApprovalEmailSender error',error)
}
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
};