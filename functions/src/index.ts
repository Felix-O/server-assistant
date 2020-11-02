import * as functions from 'firebase-functions';
const nodemailer = require('nodemailer');
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.pubsub.schedule('0 8 * * 3').onRun(async (context) => {
    
    const text = `<div>
      <p>${"Could God's Extended Hand get 30 boxes this week? Thank you much!"}</p>
    </div>`;

    const auth = functions.config().nodemailer;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: auth.user,
            clientId: auth.client_id,
            clientSecret: auth.client_secret,
            accessToken: auth.access_token,
            refreshToken: auth.refresh_token,
        }
    });

    const mailOptions = {
        to: "tyoung@cityviewsd.com",
        subject: `Food boxes`,
        // text: text,
        html: text
    };
 
    return transporter.sendMail(mailOptions)
    .then((info: any) => console.log('Email sent: ' + info.response))
    .catch((error: any) => console.log("Error sending email ---- ", error.message));

    // return null;
    
  });
