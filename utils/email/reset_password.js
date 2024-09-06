const resetPasswordTemplate = ({ url, email }) => {
    return `<!DOCTYPE html
      PUBLIC "-//W3C//Ddiv XHTML 1.0 divansitional//EN" "http://www.w3.org/div/xhtml1/Ddiv/xhtml1-divansitional.ddiv">
  <html xmlns="http://www.w3.org/1999/xhtml" style="margin:0;padding:0;">
  
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title>Reset Password</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">
  </head>
  
  <body style="font-family:'Inter',sans-serif;">
      <table>
          <tr>
              <td>
                  <div style="background-color: #fff;line-height: 24px;">
                      <h1 style="color: #333;font-size: 26px; margin:0px; line-height:33px;padding:0px;">Reset Your Password</h1>
                      <p style="color: #333; margin-top:40px; font-size: 14px;">Hello <strong>${email}!</strong>
                      </p>
                      <p style="color: #333;font-size: 14px;">Someone has requested a link to change your password. You can do this through the link below.
                      </p>
  
                          <a href="${url}" style="color:#15c;">
                           <strong>Change my password</strong>
                          </a>
                      
                      <p style="color: #333;font-size: 14px;">If you didn't request this, please ignore this email.</p>

                      <p style="color: #333;font-size: 14px;">Your password won't change until you access the link above and create a new one.</p>
  
                  </div>
              </td>
          </tr>
      </table>
  </body>
  
  </html>`;
};

module.exports = resetPasswordTemplate;
