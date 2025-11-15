import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

// Configuration du transporteur email
const createTransporter = () => {
  // Pour Gmail, il faut activer "Autoriser les applications moins sécurisées"
  // Ou utiliser un "App Password" avec 2FA activé
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"DyFolio Contact" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé:', info.messageId);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};

export const sendContactEmail = async (
  ownerEmail: string,
  senderName: string,
  senderEmail: string,
  message: string
): Promise<boolean> => {
  const subject = `Nouveau message de contact de ${senderName}`;
  
  const text = `
Vous avez reçu un nouveau message depuis votre portfolio DyFolio:

Nom: ${senderName}
Email: ${senderEmail}

Message:
${message}

---
Ceci est un message automatique depuis votre portfolio DyFolio.
  `;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 10px;
        }
        .header {
          color: #667eea;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .field {
          margin-bottom: 15px;
        }
        .label {
          font-weight: bold;
          color: #555;
        }
        .value {
          color: #333;
          margin-top: 5px;
        }
        .message-box {
          background: #f8f9fa;
          padding: 15px;
          border-left: 4px solid #667eea;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          color: white;
          margin-top: 20px;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <div class="header">📧 Nouveau message de contact</div>
          
          <div class="field">
            <div class="label">De:</div>
            <div class="value">${senderName}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${senderEmail}">${senderEmail}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Message:</div>
            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        
        <div class="footer">
          Ceci est un message automatique depuis votre portfolio DyFolio
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: ownerEmail,
    subject,
    text,
    html,
  });
};
