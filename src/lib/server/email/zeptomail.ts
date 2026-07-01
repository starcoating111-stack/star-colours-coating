/**
 * Sends a transactional email using the Zoho ZeptoMail v1.1 REST API.
 */
export async function sendEmailViaZeptoMail(
  apiKey: string,
  bounceEmail: string,
  fromName: string,
  toEmail: string,
  toName: string,
  subject: string,
  htmlBody: string
): Promise<boolean> {
  if (!apiKey || apiKey === 'mock_key_for_testing') {
    console.log(`[ZeptoMail Mock] Simulated sending email to ${toEmail}: "${subject}"`);
    return true;
  }

  // derive sender address from the verified bounceEmail domain (e.g. hello@yourdomain.com)
  // ZeptoMail strictly requires the from address domain to be verified in the account.
  const fromAddress = bounceEmail;

  const payload = {
    bounce_address: bounceEmail,
    from: {
      address: fromAddress,
      name: fromName
    },
    to: [
      {
        email_address: {
          address: toEmail,
          name: toName
        }
      }
    ],
    subject,
    htmlbody: htmlBody
  };

  try {
    const response = await fetch('https://api.zeptomail.com/v1.1/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `zoho-enczapikey ${apiKey.trim()}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`ZeptoMail HTTP Error ${response.status}:`, errText);
      return false;
    }

    return true;
  } catch (err) {
    console.error('ZeptoMail connection/fetch error:', err);
    return false;
  }
}

/**
 * Returns the HTML body for the client confirmation email.
 */
export function getClientEmailTemplate(companyName: string, clientName: string, messageBody: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; color: #1c1917; line-height: 1.6;">
      <h2 style="color: #09090b; font-size: 20px; font-weight: 700; margin-bottom: 20px;">We've received your inquiry</h2>
      <p>Hello ${clientName},</p>
      <p>Thank you for reaching out to us at <strong>${companyName}</strong>. This email confirms that we have successfully received your submission. A member of our team will review the details and get back to you shortly.</p>
      <div style="background-color: #f5f5f4; border: 1px solid #e7e5e4; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <h4 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #78716c; letter-spacing: 0.05em;">Your Message Preview</h4>
        <p style="margin: 0; font-size: 14px; white-space: pre-wrap;">${messageBody}</p>
      </div>
      <p style="font-size: 12px; color: #78716c; margin-top: 32px; border-t: 1px solid #e7e5e4; padding-top: 16px;">
        This is an automated notification. Please do not reply directly to this message.
      </p>
    </div>
  `;
}

/**
 * Returns the HTML body for the owner notification email.
 */
export function getOwnerEmailTemplate(
  companyName: string,
  name: string,
  email: string,
  phone: string | null,
  subject: string | null,
  message: string
): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; color: #1c1917; line-height: 1.6;">
      <h2 style="color: #09090b; font-size: 20px; font-weight: 700; margin-bottom: 20px;">New Form Submission</h2>
      <p>A new contact form inquiry has been submitted on the <strong>${companyName}</strong> website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="border-bottom: 1px solid #e7e5e4;">
          <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 8px 0;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e7e5e4;">
          <td style="padding: 8px 0; font-weight: bold;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e7e5e4;">
          <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
          <td style="padding: 8px 0;">${phone ?? 'Not provided'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e7e5e4;">
          <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
          <td style="padding: 8px 0;">${subject ?? 'General Inquiry'}</td>
        </tr>
      </table>

      <div style="background-color: #f5f5f4; border: 1px solid #e7e5e4; border-radius: 8px; padding: 16px;">
        <h4 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #78716c; letter-spacing: 0.05em;">Message Body</h4>
        <p style="margin: 0; font-size: 14px; white-space: pre-wrap;">${message}</p>
      </div>
      
      <p style="margin-top: 24px; font-size: 13px;">
        <a href="${process.env.PUBLIC_SITE_URL || 'https://client-site.pages.dev'}/admin/messages" style="background-color: #09090b; color: #ffffff; padding: 10px 16px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          View in Admin Inbox
        </a>
      </p>
    </div>
  `;
}
