import { transporter } from "../../config/emailTransporter.confilg.js";
import { emailVerificationTemp } from "../../emailTemplate/emailVarification.templet.js";
import { ApiError } from "../apiError.js";




export const sendEmailVarification = async (email, emailVerificationCode) => {
    // const verificationLink = `${process.env.CORS_ORIGIN}verify-email?&code=${emailVerificationCode}`;

<<<<<<< HEAD
    const mailOptions = {
  from: `"noreply" ${process.env.EMAIL_USER}`,
  to: email,
  subject: "Email Verification",
  html:emailVerificationTemp(emailVerificationCode)
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
      from: `"noreply" ${process.env.EMAIL_USER}`,
      to: email,
      subject: "Email Verification",
      html:emailVerificationTemp(emailVerificationCode)
    };
    
      const info = await transporter.sendMail(mailOptions);
            return info;
} catch (error) {
    console.log('sendemailvarficaton error',error)
    throw new ApiError(error)
}
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
};