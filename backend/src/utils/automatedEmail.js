const { Resend } = require("resend")
const config = require("../config/config.js")

const resendInstance = new Resend(config.RESEND_API_KEY);

const automatedEmail = async ({ userName, Email }) => {
    try {
        const res = await resendInstance.emails.send({
            from: "onboarding@resend.dev",
            to: Email,
            subject: "Queary Recived",
            html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>SkySolar Query Confirmation</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#0F172A;padding:30px;">
              <h1 style="color:#E8A56A;margin:0;font-size:32px;">
                Sky Renewable Energies
              </h1>
              <p style="color:#ffffff;margin-top:10px;font-size:14px;">
                Powering a Sustainable Future
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px;">

              <h2 style="color:#111827;margin-top:0;">
                Hello ${userName},
              </h2>

              <p style="font-size:16px;color:#4B5563;line-height:1.8;">
                Thank you for reaching out to SkyRenewable Energies.
              </p>

              <p style="font-size:16px;color:#4B5563;line-height:1.8;">
                We have successfully received your inquiry and our team is currently reviewing your request.
              </p>

              <div style="
                background:#F9FAFB;
                border-left:4px solid #E8A56A;
                padding:20px;
                margin:30px 0;
                border-radius:6px;
              ">
                <p style="margin:0;color:#111827;font-size:15px;">
                  Our solar experts will contact you shortly with the information and assistance you need.
                </p>
              </div>

              <p style="font-size:16px;color:#4B5563;line-height:1.8;">
                We appreciate your interest in clean and sustainable energy solutions.
              </p>

              <p style="font-size:16px;color:#111827;">
                Best Regards,<br>
                <strong>SkyRenewable Energies Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:25px;background:#F9FAFB;border-top:1px solid #E5E7EB;">

              <p style="margin:0;color:#6B7280;font-size:13px;">
                Sky Renewable Energies • Renewable Energy Solutions
              </p>

              <p style="margin-top:8px;color:#9CA3AF;font-size:12px;">
                This is an automated confirmation email. Please do not reply directly to this message.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
 });

    } catch (error) {
        throw error
    }
}

module.exports = { automatedEmail }