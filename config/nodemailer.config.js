const email = process.env.EMAIL 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: process.env.EMAIL_PASSWORD 

            
    }
});

module.exports.sendValidationEmail = (user, token) => {
    const mailOptions = {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL}>`,	// sender address
        to: user.email,	// list of receivers

        subject: 'Validate your email',

        html: ` <h1>Validate your email</h1> 
        <p>Click on the link to validate your email</p>
        <a href="http://localhost:8000/api/users/${user.id}/validate/">Validate Now</a>`
    };

    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
           console.log({
               message: 'Error sending email, please try again later' + err,
           });
        } else {
            console.log({
                message: 'Email sent successfully'
            });
        }
    }
    );
}
module.exports.sendPasswordResetEmail = (email, token) => {
    const mailOptions = {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Reset your password',
        text: `
        Please click on the following link to reset your password:
        http://localhost:3000/api/users/${token}/reset/
        `
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log(info);
        }
    }
    );
}
