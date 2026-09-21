//this file is used for the api for saving the contact form data to the database
import express from 'express';
import { Resend } from 'resend';
import postgres from "@prisma/orm-postgres/runtime"; 
import "temporal-polyfill/full/global";
import type { Contract } from "../../generated/prisma8/contract.js"; 
import contractJson from "../../generated/prisma8/contract.json"; 

const router = express.Router();
export const db = postgres<Contract>({ url: process.env.DATABASE_URL, contractJson }); 
const resend = new Resend(process.env.EMAIL_API_KEY);


router.post('/', async function(req, res) {
  
  const {firstName, lastName, email, phone, subject, message} = req.body 
  
  try {
    const saved = await db.orm.public.ContactMessage.create(
      {firstName, lastName, email, phone, subject, message }
    );

    resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject:  `Thank you for your inquiry, ${firstName}!`,
      html: `
        <p>Hi ${firstName},</p>
        <p>Thanks for reaching out about <strong>${subject}</strong>.</p>
        <p>I'll review your message and get back to you soon.</p>
        <p>- Hayden</p>
      `
    }).catch(err => {
      console.error('Email send error: ', err);
    });
    
    res.status(201).json({ success: true, message: 'Message submitted successfully!', data: saved})
  }
  catch (error){
    console.log(error)
    res.status(500).json({ success: false, message: 'Message data failed to be saved to database.'})
  }
})


export default router