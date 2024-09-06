
const nodemailer = require('nodemailer');
const resetPasswordTemplate = require('./reset_password');

const sendMail = ({ to, from, subject }, data) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.APP_EMAIL,   // email is required
            pass: process.env.APP_PASS    // app password
        }
    });

    const mailOptions = {
        from,
        to,
        subject,
        html: resetPasswordTemplate({ url: data.url, email: to }),
        headers: {
            'Content-Type': 'text/html',
        }
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response,);
            return true;
        }
    })

}

module.exports = sendMail;