import { sellerApprovalTemp } from "../../emailTemplate/sellerApprovalTemp.js";
import { transporter } from "../../config/emailTransporter.confilg.js";





export const sellerApprovalEmailSender= async (name,email,randomPassword) => {

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
};