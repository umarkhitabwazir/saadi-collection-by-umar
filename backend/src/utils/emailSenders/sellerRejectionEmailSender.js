import { transporter } from "../../config/emailTransporter.confilg.js";
import { sellerRejectionTemp } from "../../emailTemplate/sellerRejectionTemp.js";





export const sellerRejectionEmailSender= async (email,name) => {

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
};