import * as nodemailer from 'nodemailer';
import { __prod__ } from 'src/constants';

export async function sendEmail(to: string, html: string) {
  // const testAccount = await nodemailer.createTestAccount();
  // console.log(testAccount);

  // vytvorí transporter object na posielanie emailov
  // podľa prostredia použije SMTP klienta on sendinblue alebo len lokálne pomocou ethereal
  const transporter = __prod__
    ? nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'mato.michalik10@gmail.com',
          pass: process.env.SMTP_PASS,
        },
      })
    : nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'iyclkgqdjeb4adf4@ethereal.email',
          pass: 'UjDfWx18yqcjbQSMjv', // generated ethereal password
        },
      });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'your-todo-app <yourtodo@foo.com>', // sender address
    to: to,
    subject: 'Change password', // Subject line
    html: html,
  });

  console.log('Message sent: %s', info.accepted);

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
