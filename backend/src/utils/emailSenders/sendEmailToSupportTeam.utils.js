import { transporter } from "../../config/emailTransporter.confilg.js";
import { customerContactTemp } from "../../emailTemplate/customerContactTemplate.js";





export const sendEmailToSupportTeam = async (name,email,message) => {
try {
  
      const mailOptions = {
    from: `"Customer Support" ${email}`,
    to: process.env.SUPORT_TEAM_EMAIL,
    subject: "New message via contact form",
    html:customerContactTemp(name,email,message)
  };
  
  const info = await transporter.sendMail(mailOptions);
          return info;
} catch (error) {
  console.log('sendEmailToSupportTeam error',error)
}
};