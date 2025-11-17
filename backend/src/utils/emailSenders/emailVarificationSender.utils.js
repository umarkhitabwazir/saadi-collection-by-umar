import { transporter } from "../../config/emailTransporter.confilg.js";
import { emailVerificationTemp } from "../../emailTemplate/emailVarification.templet.js";
import { ApiError } from "../apiError.js";




export const sendEmailVarification = async (email, emailVerificationCode) => {
    // const verificationLink = `${process.env.CORS_ORIGIN}verify-email?&code=${emailVerificationCode}`;

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
};