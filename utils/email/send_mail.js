
const nodemailer = require('nodemailer');
const resetPasswordTemplate = require('./reset_password');
const taskStatusChangeTemplate = require('./task_status_change')

const sendMail = ({ to, from, subject, templateName }, data) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.APP_EMAIL,   // email is required
            pass: process.env.APP_PASS    // app password
        }
    });

      // Convert array of emails to comma-separated string
      const recipients = Array.isArray(to) ? to.join(',') : to;

    // Determine which template to use
    let emailTemplate;
    if (templateName === 'resetPassword') {
        emailTemplate = resetPasswordTemplate({ url: data.url, email: to });
    } else if (templateName === 'taskStatusChange') {
        emailTemplate = taskStatusChangeTemplate({
            taskName: data.taskName,
            status: data.status,
            userName: data.userName
        });
    } else {
        throw new Error('Invalid template name provided.');
    }

    const mailOptions = {
        from,
        to : recipients,
        subject,
        html: emailTemplate,
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