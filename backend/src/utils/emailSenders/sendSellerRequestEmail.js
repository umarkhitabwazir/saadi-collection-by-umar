import { transporter } from "../../config/emailTransporter.confilg.js";
import sellerRequestTemplate from "../../emailTemplate/sellerRequest.template.js";




export const sendSellerRequestEmail = async (StoreName,OwnerName,ContactEmail,SubmissionDate,ReferenceID,phone) => {
  
try {
        const mailOptions = {
            from: `"SaadiCollection" ${process.env.EMAIL_USER}`, 
            to: ContactEmail,
            subject: "seller store request",
            html: sellerRequestTemplate(StoreName,OwnerName,ContactEmail,SubmissionDate,ReferenceID,phone)
        };
    const info = await transporter.sendMail(mailOptions);
            return info;
} catch (error) {
    console.log('sendSellerRequestEmail error',error)
}
};