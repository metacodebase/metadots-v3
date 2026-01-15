import nodemailer from "nodemailer";

function getTransporter() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpHost || !smtpUser || !smtpPassword) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });
}

function getEmailConfig() {
  const smtpUser = process.env.SMTP_USER;
  const smtpFromEmail = process.env.SMTP_FROM_EMAIL || smtpUser || "";
  
  let smtpFromName = process.env.SMTP_FROM_NAME;
  if (!smtpFromName) {
    const m = "Meta";
    const d = "dots";
    smtpFromName = m + d;
  }
  
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const ccEmail = process.env.CC_EMAIL || "";

  return {
    fromEmail: smtpFromEmail,
    fromName: smtpFromName,
    adminEmail,
    ccEmail,
  };
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  projectType: string;
  budgetRange: string;
  projectDetails: string;
}

export async function sendClientConfirmationEmail(data: ContactFormData) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email not sent: SMTP not configured");
    return;
  }

  const config = getEmailConfig();
  const fullName = `${data.firstName} ${data.lastName}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Metadots</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                    Thank You, ${data.firstName}!
                  </h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <p style="margin: 0 0 20px; color: #1f2937; font-size: 16px; line-height: 1.6;">
                    We've received your message and are excited about the possibility of working with you!
                  </p>
                  
                  <div style="background-color: #f3f4f6; border-left: 4px solid #2563eb; padding: 20px; margin: 30px 0; border-radius: 8px;">
                    <p style="margin: 0 0 10px; color: #374151; font-size: 15px; font-weight: 600;">
                      What happens next?
                    </p>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      Our team will review your project details and get back to you within 24-48 hours. We're committed to providing you with the best solution for your needs.
                    </p>
                  </div>
                  
                  <div style="margin: 30px 0; padding: 20px; background-color: #eff6ff; border-radius: 8px;">
                    <p style="margin: 0 0 12px; color: #1e40af; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Your Project Summary
                    </p>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #4b5563; font-size: 14px; width: 120px;">Project Type:</td>
                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 500;">${data.projectType}</td>
                      </tr>
                      ${data.budgetRange ? `
                      <tr>
                        <td style="padding: 8px 0; color: #4b5563; font-size: 14px;">Budget Range:</td>
                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 500;">${data.budgetRange}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </div>
                  
                  <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                    If you have any urgent questions, feel free to reach out to us directly at 
                    <a href="mailto:${config.fromEmail}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${config.fromEmail}</a>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px; text-align: center;">
                    Best regards,<br>
                    <strong style="color: #1f2937;">The Metadots Team</strong>
                  </p>
                  <p style="margin: 15px 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5;">
                    This is an automated confirmation email. Please do not reply to this message.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `
Thank You, ${data.firstName}!

We've received your message and are excited about the possibility of working with you!

What happens next?
Our team will review your project details and get back to you within 24-48 hours. We're committed to providing you with the best solution for your needs.

Your Project Summary:
- Project Type: ${data.projectType}
${data.budgetRange ? `- Budget Range: ${data.budgetRange}` : ''}

If you have any urgent questions, feel free to reach out to us directly at ${config.fromEmail}

Best regards,
The Metadots Team

This is an automated confirmation email. Please do not reply to this message.
  `;

  try {
    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: data.email,
      subject: "Thank You for Contacting Metadots - We'll Be In Touch Soon!",
      html,
      text,
    });
    console.log(`✅ Confirmation email sent to ${data.email}`);
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
    throw error;
  }
}

export async function sendAdminNotificationEmail(data: ContactFormData) {
  const transporter = getTransporter();
  const config = getEmailConfig();
  
  if (!transporter || !config.adminEmail) {
    console.warn("Email not sent: SMTP or admin email not configured");
    return;
  }

  const fullName = `${data.firstName} ${data.lastName}`;
  const submissionDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - Metadots</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 650px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="padding: 30px 40px; text-align: center; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                    🔔 New Contact Form Submission
                  </h1>
                  <p style="margin: 10px 0 0; color: #fecaca; font-size: 14px;">
                    Please review and respond promptly
                  </p>
                </td>
              </tr>
              
              <!-- Alert Banner -->
              <tr>
                <td style="padding: 20px 40px; background-color: #fef2f2; border-bottom: 1px solid #fee2e2;">
                  <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 500;">
                    ⏰ Submitted on ${submissionDate}
                  </p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <!-- Contact Information -->
                  <div style="margin-bottom: 30px;">
                    <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      Contact Information
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; width: 140px; vertical-align: top;">Name:</td>
                        <td style="padding: 12px 0; color: #1f2937; font-size: 15px; font-weight: 500;">${fullName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Email:</td>
                        <td style="padding: 12px 0;">
                          <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none; font-size: 15px; font-weight: 500;">${data.email}</a>
                        </td>
                      </tr>
                      ${data.company ? `
                      <tr>
                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Company:</td>
                        <td style="padding: 12px 0; color: #1f2937; font-size: 15px; font-weight: 500;">${data.company}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </div>
                  
                  <!-- Project Details -->
                  <div style="margin-bottom: 30px;">
                    <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      Project Details
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; width: 140px; vertical-align: top;">Project Type:</td>
                        <td style="padding: 12px 0;">
                          <span style="display: inline-block; background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 6px; font-size: 14px; font-weight: 500;">
                            ${data.projectType}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Budget Range:</td>
                        <td style="padding: 12px 0; color: #1f2937; font-size: 15px; font-weight: 500;">${data.budgetRange || "Not specified"}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <!-- Project Description -->
                  <div style="margin-bottom: 30px;">
                    <h2 style="margin: 0 0 15px; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      Project Description
                    </h2>
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
                      <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.projectDetails}</p>
                    </div>
                  </div>
                  
                  <!-- Action Button -->
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="mailto:${data.email}?subject=Re: Your ${data.projectType} Project Inquiry" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);">
                      Reply to ${data.firstName}
                    </a>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center; line-height: 1.6;">
                    This is an automated notification from the Metadots contact form system.<br>
                    Please respond to the client within 24-48 hours.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `
New Contact Form Submission - Metadots

Submitted on: ${submissionDate}

Contact Information:
- Name: ${fullName}
- Email: ${data.email}
${data.company ? `- Company: ${data.company}` : ''}

Project Details:
- Project Type: ${data.projectType}
- Budget Range: ${data.budgetRange || "Not specified"}

Project Description:
${data.projectDetails}

---
This is an automated notification. Please respond to the client within 24-48 hours.
  `;

  try {
    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.adminEmail,
      cc: config.ccEmail || undefined,
      subject: `🔔 New Contact Form: ${fullName} - ${data.projectType}`,
      html,
      text,
    });
    console.log(`✅ Notification email sent to ${config.adminEmail}${config.ccEmail ? ` and ${config.ccEmail}` : ""}`);
  } catch (error) {
    console.error("❌ Failed to send admin notification email:", error);
    throw error;
  }
}
