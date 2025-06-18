// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { email, name, quantity, paymentMethod, totalAmount } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables
      pass: process.env.EMAIL_PASS, // Use environment variables
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmation: Reservation of "[All Yours]" by Pr. Dennis Kasirye',
    html: `
      <h2 style="color: #4B0082;">Reservation Confirmation</h2>
      <p>Dear ${name},</p>
      <p>Thank you for reserving your signed copy${quantity > 1 ? 'ies' : ''} of <strong>[All Yours]</strong> by Pr. Dennis Kasirye!</p>
      <p><strong>Order Details:</strong></p>
      <ul>
        <li>Quantity: ${quantity} ${quantity > 1 ? 'copies' : 'copy'}</li>
        <li>Total Amount: UGX ${totalAmount}</li>
        <li>Payment Method: ${paymentMethod === 'mtn' ? 'MTN Mobile Money' : 'Airtel Money'}</li>
      </ul>
      <p><strong>Payment Instructions:</strong></p>
      ${paymentMethod === 'mtn'
        ? '<p>To pay for services a customer dials *165*3# and then enters the merchant code, the amount to pay and the Mobile Money PIN.</p>'
        : '<p>Send UGX ' + totalAmount + ' to +256700123456 (Airtel Money) via *185#. Use your name and phone number as reference.</p>'
      }
      <p>hank you for your support! Be sure to check out the LatterGlory YouTube channel for more inspiring content. God bless you!.</p>
      <p>Delivery details will be sent to your email within 24 hours of payment confirmation. For any inquiries, contact us at support@allyoursbook.com.</p>
      <p>Best regards,<br>The [All Yours] Team</p>
      <p style="font-size: 12px; color: #666;">Sent on ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}