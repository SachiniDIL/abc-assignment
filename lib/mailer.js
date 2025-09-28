// // lib/email/mailer.js
// import nodemailer from "nodemailer";
//
// export const sendEmail = async ({ to, subject, html }) => {
//
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//         debug: true, // Enable debug logs
//         logger: true // Enable logger
//     });
//
//     // Test the connection first
//     try {
//         await transporter.verify();
//     } catch (verifyError) {
//         throw new Error(`SMTP connection failed: ${verifyError.message}`);
//     }
//
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to,
//         subject,
//         html,
//     };
//
//     console.log("📮 Sending email with options:", {
//         from: mailOptions.from,
//         to: mailOptions.to,
//         subject: mailOptions.subject
//     });
//
//     try {
//         return await transporter.sendMail(mailOptions);
//     } catch (error) {
//         throw error;
//     }
// };
//
// //
// // // lib/email/sendEmail.js
// // import nodemailer from "nodemailer";
// //
// // export const sendEmail = async ({ to, subject, html }) => {
// //     const transporter = nodemailer.createTransport({
// //         host: "smtp.gmail.com",          // SMTP server address (for Gmail)
// //         port: 587,                       // Port for TLS (secure email sending)
// //         secure: false,                   // Use TLS, not SSL (false = TLS)
// //         auth: {
// //             user: process.env.EMAIL_USER, // your email address
// //             pass: process.env.EMAIL_PASS, // your app password (not your real password)
// //         },
// //     });
// //
// //     const mailOptions = {
// //         from: `"Top Gamers" <${process.env.EMAIL_USER}>`,
// //         to,
// //         subject,
// //         html,
// //     };
// //
// //     await transporter.sendMail(mailOptions);
// // };

// lib/email/mailer.js
import nodemailer from "nodemailer";

/**
 * Send an email from the client email to any user
 * @param {Object} params
 * @param {string} params.to - Recipient email
 * @param {string} params.subject - Email subject
 * @param {string} params.html - HTML content of the email
 */
export const sendEmail = async ({ to, subject, html }) => {
    // 1️⃣ Configure SMTP transporter (fill in correct details)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "mail.agromax.lk", // SMTP host from client
        port: Number(process.env.EMAIL_PORT) || 587,       // 587 TLS, 465 SSL
        secure: false,                                     // false = TLS
        auth: {
            user: process.env.EMAIL_USER || "info@agromax.lk", // client email
            pass: process.env.EMAIL_PASS || "YOUR_PASSWORD_HERE", // password/app password
        },
        tls: {
            rejectUnauthorized: false, // helpful for self-signed certs
        },
        logger: true,  // detailed logs
        debug: true,   // debug output
    });

    // 2️⃣ Verify SMTP connection
    try {
        await transporter.verify();
        console.log("✅ SMTP server is ready to send emails");
    } catch (err) {
        throw new Error(`❌ SMTP connection failed: ${err.message}`);
    }

    // 3️⃣ Email options
    const mailOptions = {
        from: `"Agromax" <${process.env.EMAIL_USER || "info@agromax.lk"}>`,
        to,
        subject,
        html,
    };

    console.log("📮 Sending email with options:", {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
    });

    // 4️⃣ Send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
        return info;
    } catch (error) {
        throw new Error(`❌ Failed to send email: ${error.message}`);
    }
};
