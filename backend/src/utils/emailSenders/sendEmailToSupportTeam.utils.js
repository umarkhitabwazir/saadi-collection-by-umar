import { transporter } from "../../config/emailTransporter.confilg.js";
import { customerContactTemp } from "../../emailTemplate/customerContactTemplate.js";





export const sendEmailToSupportTeam = async (name,email,message) => {
<<<<<<< HEAD

    const mailOptions = {
  from: `"Customer Support" ${email}`,
  to: process.env.SUPORT_TEAM_EMAIL,
  subject: "New message via contact form",
  html:customerContactTemp(name,email,message)
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
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
};