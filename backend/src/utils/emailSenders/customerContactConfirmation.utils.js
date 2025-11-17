import { transporter } from "../../config/emailTransporter.confilg.js";
import { customerContactConfirmationTemp } from "../../emailTemplate/customerContactConfirmationTemp.js";
import { ApiError } from "../apiError.js";




export const sendcustomerConfirmations = async (name,email) => {

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
};