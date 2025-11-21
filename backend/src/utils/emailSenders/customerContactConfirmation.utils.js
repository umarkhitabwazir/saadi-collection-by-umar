import { transporter } from "../../config/emailTransporter.confilg.js";
import { customerContactConfirmationTemp } from "../../emailTemplate/customerContactConfirmationTemp.js";
<<<<<<< HEAD
=======
import { ApiError } from "../apiError.js";
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95




export const sendcustomerConfirmations = async (name,email) => {

<<<<<<< HEAD
    const mailOptions = {
  from: `"saadiCollection Support" ${process.env.EMAIL_USER}`,
  to: email,
  subject: "We’ve received your message",
  html:customerContactConfirmationTemp(name)
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
      from: `"saadiCollection Support" ${process.env.EMAIL_USER}`,
      to: email,
      subject: "We’ve received your message",
      html:customerContactConfirmationTemp(name)
    };
    
     const info = await transporter.sendMail(mailOptions);
        return info;
} catch (error) {
    console.log('sendcustomerConfirmations error',error)
    throw new ApiError(error)
}
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
};