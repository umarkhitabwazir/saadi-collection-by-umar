import nodemailer from "nodemailer";

<<<<<<< HEAD
=======
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error("EMAIL_USER or EMAIL_PASS is missing in environment variables");
}
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95

export const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
<<<<<<< HEAD
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
=======
        user: EMAIL_USER,
        pass: EMAIL_PASS,
>>>>>>> b8914c9815d3a01f327168a987b832ac43b6ff95
    },
    logger: true,
    debug: true,
});