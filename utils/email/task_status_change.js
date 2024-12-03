const taskStatusChangeTemplate = ({ taskName, status, userName }) => {
    return `<!DOCTYPE html
      PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" style="margin:0;padding:0;">
  
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title>Task Status Update</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">
  </head>
  
  <body style="font-family:'Inter',sans-serif;">
      <table style="width:100%; border-spacing:0; border-collapse:collapse;">
          <tr>
              <td style="padding:20px; background-color: #f4f4f4;">
                  <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:5px; padding:20px; box-shadow:0 2px 4px rgba(0, 0, 0, 0.1); line-height:24px;">
                      <h1 style="color:#333333; font-size:24px; margin:0 0 20px;">Task Status Update</h1>
                      <p style="color:#333333; font-size:16px; margin:0 0 10px;">
                          Hello <strong>"${userName}"</strong>,
                      </p>
                      <p style="color:#333333; font-size:16px; margin:0 0 20px;">
                          The status of your task <strong>"${taskName}"</strong> has been updated.
                      </p>
                      <p style="color:#333333; font-size:16px; margin:0 0 20px;">
                          <strong>New Status:</strong> ${status}
                      </p>
                      <p style="color:#333333; font-size:16px; margin:0 0 20px;">
                          Please log in to your account for more details.
                      </p>
                      <a href="http://localhost:3000/tasks" style="display:inline-block; text-decoration:none; background-color:#007BFF; color:#ffffff; padding:10px 20px; border-radius:5px; font-size:16px;">
                          View Tasks
                      </a>
                      <p style="color:#777777; font-size:12px; margin:20px 0 0; text-align:center;">
                          This is an automated message. If you did not perform this action, please contact support.
                      </p>
                  </div>
              </td>
          </tr>
      </table>
  </body>
  
  </html>`;
};

module.exports = taskStatusChangeTemplate;
