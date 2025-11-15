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
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          background: #04060B;
          padding: 40px 20px;
          min-height: 100vh;
        }
        
        .container {
          max-width: 650px;
          margin: 0 auto;
          position: relative;
        }
        
        /* Glass Card - Dark Mode Style */
        .glass-card {
          background: #0F1729;
          backdrop-filter: blur(18px);
          border: 1px solid rgba(220, 235, 255, 0.08);
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 26px 48px -28px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }
        
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #4CC9FF, transparent);
          opacity: 0.5;
        }
        
        /* Header */
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(220, 235, 255, 0.08);
        }
        
        .logo {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #4CC9FF 0%, #2B9CFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          letter-spacing: -1px;
        }
        
        .subtitle {
          color: #94a3b8;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        
        /* Title */
        .title {
          font-size: 24px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 12px;
          text-align: center;
        }
        
        .timestamp {
          color: #94a3b8;
          font-size: 13px;
          text-align: center;
          margin-bottom: 32px;
        }
        
        /* Info Section */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }
        
        .info-card {
          background: rgba(76, 201, 255, 0.05);
          border: 1px solid rgba(220, 235, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        
        .info-card:hover {
          background: rgba(76, 201, 255, 0.08);
          border-color: rgba(76, 201, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .info-label {
          font-size: 11px;
          font-weight: 600;
          color: #4CC9FF;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        
        .info-value {
          color: #F8FAFC;
          font-size: 15px;
          font-weight: 500;
          word-break: break-word;
        }
        
        .info-value a {
          color: #4CC9FF;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .info-value a:hover {
          color: #2B9CFF;
        }
        
        /* Message Box */
        .message-section {
          margin-top: 32px;
        }
        
        .message-label {
          font-size: 11px;
          font-weight: 600;
          color: #4CC9FF;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }
        
        .message-box {
          background: rgba(15, 23, 41, 0.8);
          border: 1px solid rgba(220, 235, 255, 0.08);
          border-left: 3px solid #4CC9FF;
          border-radius: 12px;
          padding: 24px;
          color: #F8FAFC;
          font-size: 15px;
          line-height: 1.7;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        /* Action Button */
        .action-section {
          margin-top: 32px;
          text-align: center;
        }
        
        .reply-button {
          display: inline-block;
          background: linear-gradient(135deg, #4CC9FF 0%, #2B9CFF 100%);
          color: #04060B;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(76, 201, 255, 0.3);
        }
        
        .reply-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(76, 201, 255, 0.4);
        }
        
        /* Footer */
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid rgba(220, 235, 255, 0.08);
          color: #94a3b8;
          font-size: 12px;
          line-height: 1.8;
        }
        
        .footer-logo {
          font-weight: 600;
          background: linear-gradient(135deg, #4CC9FF, #2B9CFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
          body {
            padding: 20px 10px;
          }
          
          .glass-card {
            padding: 32px 24px;
            border-radius: 20px;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          
          .title {
            font-size: 20px;
          }
          
          .logo {
            font-size: 28px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="glass-card">
          <!-- Header -->
          <div class="header">
            <div class="logo">DyFolio</div>
            <div class="subtitle">Portfolio Management System</div>
          </div>
          
          <!-- Title -->
          <div class="title">
            Nouveau message de contact
          </div>
          
          <div class="timestamp">
            ${new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          
          <!-- Info Grid -->
          <div class="info-grid">
            <div class="info-card">
              <div class="info-label">Expéditeur</div>
              <div class="info-value">${senderName}</div>
            </div>
            
            <div class="info-card">
              <div class="info-label">Email</div>
              <div class="info-value">
                <a href="mailto:${senderEmail}">${senderEmail}</a>
              </div>
            </div>
          </div>
          
          <!-- Message -->
          <div class="message-section">
            <div class="message-label">Message</div>
            <div class="message-box">${message}</div>
          </div>
          
          <!-- Action Button -->
          <div class="action-section">
            <a href="mailto:${senderEmail}?subject=Re: Contact depuis DyFolio" class="reply-button">
              Répondre au message
            </a>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            Message reçu via votre portfolio <span class="footer-logo">DyFolio</span>
            <br>
            Ce message a été envoyé automatiquement depuis votre formulaire de contact
          </div>
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
