import * as AWS from "aws-sdk";
// import nodemailer from "nodemailer";
import * as nodemailer from "nodemailer";
import {
  EMAIL_FROM_ADDRESS,
  MANUAL_PROCESSING_EMAIL
} from "../constants/emailConstants";
import { EmailData } from "../types/EmailData";

const ses = new AWS.SES({ region: "us-east-1" });

export const sendEmailWithSES = async (
  emailData: EmailData
): Promise<boolean> => {
  const { subject, body } = emailData;

  const params: AWS.SES.SendEmailRequest = {
    Source: EMAIL_FROM_ADDRESS,
    Destination: {
      ToAddresses: [MANUAL_PROCESSING_EMAIL]
    },
    Message: {
      Subject: {
        Data: subject
      },
      Body: {
        Text: {
          Data: body
        }
      }
    }
  };

  try {
    const response = await ses.sendEmail(params).promise();
    return response.$response.httpResponse.statusCode === 200;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const sendEmailWithNodemailer = async (
  emailData: EmailData
): Promise<boolean> => {
  const { subject, body } = emailData;
  // Create a Nodemailer transporter

  const transporter = nodemailer.createTransport({
    // Specify your email provider details here
    // For example, if using Gmail, you would provide SMTP configuration
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },

    tls: {
      ciphers: "SSLv3"
    }
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "juanman234@gmail.com",
    subject: subject,
    text: body
  };
  console.log(mailOptions);
  try {
    // Send the email
    const res = await transporter.sendMail(mailOptions);
    console.log({ res });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
