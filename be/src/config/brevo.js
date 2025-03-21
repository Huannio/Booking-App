const env = require("../config/environment");

const brevo = require("@getbrevo/brevo");
let apiInstance = new brevo.TransactionalEmailsApi();
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = env.BREVO_API_KEY;

const sendEmail = async (email, subject, content) => {
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.sender = {
    email: env.ADMIN_EMAIL_ADDRESS,
    name: env.ADMIN_EMAIL_NAME,
  };

  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = content;

  return apiInstance.sendTransacEmail(sendSmtpEmail);
};

module.exports = sendEmail;
